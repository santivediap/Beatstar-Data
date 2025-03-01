const express = require('express');
require('dotenv').config()

const app = express();
app.use(express.json({ extended: false }));

// Connect Postgres DB
const postgresDB = require("./utils/postgresql")
postgresDB.connectSQL()

app.get("/", async (req, res) => {
    res.status(200).json({
        msg: "Test"
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started port ${PORT}`));