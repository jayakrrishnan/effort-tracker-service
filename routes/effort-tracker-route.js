var mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "effort_tracker",
  connectionLimit: 20,
});

exports.insertDailyEffort = async function (req, res) {
  var dailyEffort = {
    user_id: req.body.userId,
    effort_date: req.body.effortDate,
    project_id: req.body.projectId,
    project_task_hr: req.body.projectTaskHr,
    project_meeting_hr: req.body.projectMeetingHr,
    training_hr: req.body.trainingHr,
    vdi_unavail_hr: req.body.vdiUnavailHr,
    leave_hr: req.body.leaveHr,
    other_hr: req.body.otherHr,
    wfo_hr: req.body.wfoHr,
    wfh_hr: req.body.wfhHr,
    rework_hr: req.body.reworkHr,
    adhoc_hr: req.body.adhocHr,
    reason_for_not_working: req.body.rsnForNotWorking,
    comment_for_not_working: req.body.commentForNotWorking,
    reason_for_wfh: req.body.rsnForWFH,
    comments: req.body.comments,
    last_change_ts: new Date(),
  };
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error: " + err);
      connection.release();
      res.status(500).send({ errorText: "sql connection error" });
    } else {
      connection.query("INSERT INTO daily_effort SET ?", dailyEffort, function (
        error,
        results,
        fields
      ) {
        if (error) {
          console.log("error:" + error);
          res.status(409).send({
            errorText: "error ocurred while adding daily effort",
          });
        } else {
          res.status(201).send({
            success: "daily effort added successfully",
          });
        }
      });
    }
  });
};

exports.fetchDailyEffort = async function (req, res) {
  var param = [];
  var selectQuery =
    "select l.user_id as userId,l.email as email ,l.role_id as roleId," +
    "DATE_FORMAT(de.effort_date,'%Y-%m-%e') as effortDate,de.project_id as projectId,de.project_task_hr as projectTaskHr," +
    "de.project_meeting_hr as projectMeetingHr,de.training_hr as trainingHr," +
    "de.vdi_unavail_hr as vdiUnavailHr,de.leave_hr as leaveHr,de.other_hr as otherHr," +
    "de.wfo_hr as wfoHr,de.wfh_hr as wfhHr,de.rework_hr as reworkHr,de.adhoc_hr as adhocHr," +
    "de.reason_for_not_working as rsnForNotWorking,de.comment_for_not_working as commentForNotWorking," +
    "de.reason_for_wfh as rsnForWFH,de.comments as comments ,de.last_change_ts as lastChangeTs " +
    "from login l left join daily_effort de on l.user_id=de.user_id " +
    "where 1=1 ";

  if (req.body.userId) {
    selectQuery = selectQuery.concat(" and l.user_id = ? ");
    param.push(req.body.userId);
  }
  if (req.body.effortDate) {
    selectQuery = selectQuery.concat(" and de.effort_date = ? ");
    param.push(req.body.effortDate);
  }
  if (req.body.projectId) {
    selectQuery = selectQuery.concat(" and de.project_id = ? ");
    param.push(req.body.projectId);
  }
  selectQuery = selectQuery.concat(
    " order by de.effort_date desc,de.project_id "
  );
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error: " + err);
      connection.release();
      res.status(500).send({ errorText: "sql connection error" });
    } else {
      connection.query(selectQuery, param, function (error, results, fields) {
        if (error) {
          console.log("error:" + error);
          res.status(409).send({
            errorText: "error ocurred while fetching daily effort",
          });
        } else if (results && results.length > 0) {
          res.status(200).send(results);
        } else {
          res.status(204).send(results);
        }
      });
    }
  });
};

exports.updateDailyEffort = async function (req, res) {
  var dailyEffort = {
    project_task_hr: req.body.projectTaskHr,
    project_meeting_hr: req.body.projectMeetingHr,
    training_hr: req.body.trainingHr,
    vdi_unavail_hr: req.body.vdiUnavailHr,
    leave_hr: req.body.leaveHr,
    other_hr: req.body.otherHr,
    wfo_hr: req.body.wfoHr,
    wfh_hr: req.body.wfhHr,
    rework_hr: req.body.reworkHr,
    adhoc_hr: req.body.adhocHr,
    reason_for_not_working: req.body.rsnForNotWorking,
    comment_for_not_working: req.body.commentForNotWorking,
    reason_for_wfh: req.body.rsnForWFH,
    comments: req.body.comments,
    last_change_ts: new Date(),
  };

  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error: " + err);
      connection.release();
      res.status(500).send({ errorText: "sql connection error" });
    } else {
      connection.query(
        "update daily_effort SET ? where user_id=? and effort_date=? and project_id=? ",
        [dailyEffort, req.body.userId, req.body.effortDate, req.body.projectId],
        function (error, results, fields) {
          if (error) {
            console.log("error:" + error);
            res.status(409).send({
              errorText: "error ocurred while updating daily effort",
            });
          } else {
            res.status(200).send({
              success: "daily effort updated successfully",
            });
          }
        }
      );
    }
  });
};

exports.deleteDailyEffort = async function (req, res) {
  var userId = req.query.userId;
  var effortDate = req.query.effortDate;
  var projectId = req.query.projectId;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log("error: " + err);
      connection.release();
      res.status(500).send({ errorText: "sql connection error" });
    } else {
      connection.query(
        "delete from daily_effort where user_id=? and effort_date=? and project_id=? ",
        [req.query.userId, req.query.effortDate, req.query.projectId],
        function (error, results, fields) {
          if (error) {
            console.log("error:" + error);
            res.status(409).send({
              errorText: "error ocurred while deleting daily effort",
            });
          } else {
            res.status(200).send({
              success: "daily effort deleted successfully",
            });
          }
        }
      );
    }
  });
};
