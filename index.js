require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const connection = require("./config/db");

connection();
const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
    // "https://pmhthai.com",
    // "https://www.pmhthai.com",
    // "http://178.128.121.55",
    "http://localhost:5173",
    "http://localhost:3000"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

const allowedIPs = [
    //   "178.128.121.55",  // frontend
    //   "183.89.204.12",   // client
    "127.0.0.1",       // loopback (IPv4)
    "::1"              // loopback (IPv6)
];

const loggedIPs = new Set();

app.use((req, res, next) => {
    const rawIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const clientIP = rawIP.replace("::ffff:", "").split(",")[0].trim();
    const now = new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });

    if (req.method === "OPTIONS") return next(); // ✅ ให้ OPTIONS ผ่าน

    if (!loggedIPs.has(clientIP)) {
        console.log(`[${now}] 🌐 IP ที่เข้ามา:`, clientIP);
        loggedIPs.add(clientIP);
    }

    if (allowedIPs.includes(clientIP)) {
        return next();
    }

    console.warn(`[${now}] ❌ Blocked IP:`, clientIP);
    return res.status(403).json({ message: "Access denied" });
});

app.use(express.json({
    limit: '100mb',
    extended: true
}));

app.use(express.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 100000
}));

app.use(cookieParser());

//Route
const prefix = "/api/v1";

app.use(prefix + "/users", require("./routes/userRoute"));

const PORT = process.env.PORT || 8888;
httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

