const Users = require('../models/userModal.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateMemberId = async () => {
    const lastMember = await Users.findOne({}, {}, { sort: { createdAt: -1 } });

    let lastId = 0;
    if (lastMember && lastMember.memberId) {
        const numberPart = lastMember.memberId.replace(/^M/, "");
        if (!isNaN(numberPart)) {
            lastId = parseInt(numberPart);
        } else {
            console.warn("Invalid memberId format:", lastMember.memberId);
        }
    }

    return "M" + String(lastId + 1).padStart(6, "0");
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}

exports.getUserByMemberId = async (req, res) => {
    try {
        const { memberId } = req.body;

        const user = await Users.findOne({ memberId: memberId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, password, phone, email, firstname, lastname } = req.body;

        console.log("Creating user with data:", {
            username, phone, email, firstname, lastname
        });


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Hashed password:", hashedPassword);

        const memberId = await generateMemberId();

        const newUser = new Users({
            memberId,
            username,
            password: hashedPassword,
            phone,
            email,
            firstname,
            lastname
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const payload = {
            id: user._id,
            username: user.username,
            memberId: user.memberId
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'structureSecret', { expiresIn: '5h' });

        const { password: _, ...userWithoutPassword } = user.toObject();
        userWithoutPassword.token = token;

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}