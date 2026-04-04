const goodIssue = require('../../models/admins/reports/goodissueModal');
const Material = require('../../models/materialModal');
const Counter = require('../../models/admins/counter');
const StockReport = require('../../models/admins/reports/stockreportModal');
const mongoose = require('mongoose');


// 🔢 generate running code (GI00001)
const generateCode = async () => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const dateStr = `${day}${month}${year}`;

    // 🔥 เพิ่มเลขแบบ atomic (ไม่ชนแน่นอน)
    const counter = await Counter.findOneAndUpdate(
        { name: 'good_issue' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    const running = String(counter.seq).padStart(5, '0');

    return `GI${dateStr}${running}`;
};

const generateStockReportCode = async (session) => {
    const year = new Date().getFullYear();

    // ✅ ใช้ counter ตัวเดียว (ไม่แยกปี)
    const counter = await Counter.findOneAndUpdate(
        { name: 'stockReport' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true, session }
    );

    const runningStr = String(counter.seq).padStart(6, '0');

    return `SR${year}${runningStr}`;
};


// ✅ GET ALL
exports.getAllGoodIssues = async (req, res) => {
    try {
        const data = await goodIssue.find()
            .sort({ createdAt: -1 })
            // .populate('items.materialId');

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ GET BY ID
exports.getGoodIssueById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await goodIssue.findById(id)
            .populate('items.materialId');

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Good Issue not found'
            });
        }

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ CREATE (POST)
exports.createGoodIssue = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const body = req.body;

        if (!body.items || body.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Items must not be empty'
            });
        }

        const code = await generateCode();

        const newDoc = new goodIssue({
            ...body,
            code
        });

        await newDoc.save({ session });

        for (const item of body.items) {

            const material = await Material.findById(item.materialId).session(session);

            if (!material) {
                throw new Error('Material not found');
            }

            const previousStock = material.quantity;
            const currentStock = previousStock - item.quantity;

            if (currentStock < 0) {
                throw new Error(`Stock not enough for ${material.code}`);
            }

            await Material.updateOne(
                { _id: item.materialId },
                { $inc: { quantity: -item.quantity } },
                { session }
            );

            await StockReport.create([{
                code: await generateStockReportCode(), // ต้องมี fn นี้
                goodIssueCode: code,
                materialId: item.materialId,
                materialCode: material.code,
                productName: material.productName,
                transactionType: 'ISSUE',

                quantity: item.quantity,
                previousStock,
                currentStock,

                unitId: material.unitId,
                warehouseLocation: material.warehouseLocation,
                remark: body.remark || '',
                createdBy: body.createdBy || 'system'
            }], { session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'Good Issue created successfully',
            data: newDoc
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ✅ UPDATE (PUT)
exports.updateGoodIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const updated = await goodIssue.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Good Issue not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Good Issue updated successfully',
            data: updated
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ❌ DELETE
exports.deleteGoodIssue = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        const doc = await GoodIssue.findById(id).session(session);

        if (!doc) {
            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({
                success: false,
                message: 'Good Issue not found'
            });
        }

        // 🔥 คืน stock ทุก item
        for (const item of doc.items) {
            await Material.updateOne(
                { _id: item.materialId },
                { $inc: { stock: item.quantity } },
                { session }
            );
        }

        // 🗑 ลบ document
        await goodIssue.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: 'Good Issue deleted and stock restored successfully'
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};