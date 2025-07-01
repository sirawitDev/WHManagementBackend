# Express.js Project Structure Template

A clean and scalable Express.js boilerplate designed for RESTful API development using Node.js and MongoDB.

## 🔧 Technologies & Dependencies

- **[Express.js v5](https://expressjs.com/)** – Web framework for building APIs
- **[Mongoose](https://mongoosejs.com/)** – ODM for MongoDB
- **[dotenv](https://www.npmjs.com/package/dotenv)** – Environment variable management
- **[cors](https://www.npmjs.com/package/cors)** – Cross-Origin Resource Sharing support
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** – Middleware for parsing cookies
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** – JWT for authentication
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** – Password hashing and comparison

## 📁 Project Structure

```bash
Express-Structure/
├── config/             # MongoDB connection and app configuration
│   └── db.js
├── controllers/        # Route controllers / business logic
├── models/             # Mongoose models / schemas
├── routes/             # API route definitions
├── utils/              # Utility/helper functions
├── .env                # Environment variables
├── .gitignore
├── index.js            # Main application entry point
├── package.json
└── README.md
