const StockReport = require('../../models/admins/reports/stockreportModal');

// ✅ GET ALL
exports.getStockReports = async (req, res) => {
    try {
        const stock = await StockReport.find();
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
