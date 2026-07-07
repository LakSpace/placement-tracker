require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
db.connect((err) => {
    if (err) {
        console.log("Connection Failed");
        return;
    }

    console.log("Connected to MySQL");
});


app.use(cors());
app.use(express.json());

app.get("/companies", (req, res) => {
    db.query("SELECT * FROM companies", (err, result) => {
        if (err) {
            res.send("Error");
            return;
        }

        res.json(result);
    });
});

app.post("/companies", (req, res) => {

    const { company, status, deadline } = req.body;

    db.query(
        "INSERT INTO companies (company, status, deadline) VALUES (?, ?, ?)",
        [company, status, deadline],
        (err, result) => {
            if (err) {
                res.send("Error");
                return;
            }

            res.send("Company Added");
        }
    );
});

app.delete("/companies/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM companies WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                res.send("Error");
                return;
            }

            res.send("Company deleted!");
        }
    );
});

app.put("/companies/:id", (req, res) => {

    const id = req.params.id;
    const { company, status, deadline } = req.body;

    db.query(
        "UPDATE companies SET company = ?, status = ?, deadline = ? WHERE id = ?",
        [company, status, deadline, id],
        (err, result) => {
            if (err) {
                res.send("Error");
                return;
            }

            res.send("Company updated!");
        }
    );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});