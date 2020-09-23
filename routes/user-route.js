var mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "effort_tracker",
  connectionLimit: 20,
});

exports.register = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  var users = {
    user_id: req.body.userId,
    email: req.body.email,
    passcode: encryptedPassword,
    role_id: req.body.roleId,
  };
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error: " + err);
      connection.release();
      res.status(500).send({ errorText: "sql connection error" });
    } else {
      connection.query("INSERT INTO login SET ?", users, function (
        error,
        results,
        fields
      ) {
        if (error) {
          console.log("error:" + error);
          res.status(500).send({
            failed: "error ocurred",
          });
        } else {
          res.status(201).send({
            success: "user registered sucessfully",
          });
        }
      });
    }
  });
};

exports.login = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error: " + err);
      connection.release();
      res.status(500).send({ errorText: "sql connection error" });
    } else {
      connection.query(
        "SELECT * FROM login WHERE user_id= ? or email = ?",
        [email, email],
        async function (error, results, fields) {
          if (error) {
            res.status(500).send({
              errorText: "error ocurred while feching login data",
            });
          } else {
            if (results.length > 0) {
              const comparision = await bcrypt.compare(
                password,
                results[0].passcode
              );
              if (comparision) {
                res.status(200).send({
                  userId:results[0].user_id,
                  email:results[0].email,
                  roleId:results[0].role_id
                });
              } else {
                res.status(409).send({
                  errorText: "Email and password does not match",
                });
              }
            } else {
              res.status(204).send({
                errorText: "Email does not exits",
              });
            }
          }
        }
      );
    }
  });
};
