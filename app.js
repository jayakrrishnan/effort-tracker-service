const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
var userRoute = require("./routes/user-route");
var trackerRoute = require("./routes/effort-tracker-route");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "effort_tracker",
  insecureAuth:true
});

router.get("/status", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log("Ex: " + err);
      res.json({ health: "DOWN" });
    }
    res.json({ health: "UP" });
  });
});

app.use("/api", router);

router.post("/user/register", userRoute.register);
router.post("/user/login", userRoute.login);

router.post("/tracker/", trackerRoute.insertDailyEffort);
router.post("/tracker/fetch", trackerRoute.fetchDailyEffort);
router.put("/tracker/", trackerRoute.updateDailyEffort);
router.delete("/tracker", trackerRoute.deleteDailyEffort);

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
