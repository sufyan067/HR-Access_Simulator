const express = require("express");
const cors = require("cors");
const employees = require("./employees.json");
const { simulateAccess } = require("./rules");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/simulate", (req, res) => {
  const results = simulateAccess(employees);
  res.json(results);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
