const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

/*
 * - Middlewares
 */

app.use(express.json());
app.use(cookieParser());

/*
 * - Routes
 */

const authRoutes = require("./routes/auth.routes");
const accountRoutes = require("./routes/account.routes");

/*
 * - Use Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);

module.exports = app;
