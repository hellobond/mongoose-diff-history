var express = require("express");
var router = express.Router();
var Logger = require("../utils/logger.js");
var Manager = require("../models/Manager.js");

/* GET /managers/1234 */
router.get("/:managerId", function (req, res, next) {
    Manager.find({managerId: req.params.managerId}).exec(function (err, managerResult) {
        if (err) {
            return next(err);
        }
        res.json(managerResult[0] ? managerResult[0] : {});
    });
});


router.post("/", function (req, res, next) {
    Manager.create(req.body, function (err, createOutput) {
        if (err){ return next(err);}
        res.json(createOutput);
    });
});

router.put("/update/:managerId", function (req, res, next) {
    Manager.update({managerId: req.params.managerId}, req.body, {
        new: true,
        __user: {name: "Mimani", role: "admin"},
        __reason: "Mimani updated"
    }, function (errFind, updatedEmp) {
        if (errFind) {
            res.sendStatus(500);
            return next(errFind);
        }
        return res.json(updatedEmp);
    });
});


router.put("/:managerId", function (req, res, next) {
    Manager.find({managerId: req.params.managerId}, function (errFind, postFind) {
        if (errFind) {
            res.sendStatus(500);
            return next(errFind);
        }
        if (postFind && Array.isArray(postFind) && postFind.length > 0) {
            var manager = postFind[0];
            for (var key in req.body) {
                manager[key] = req.body[key];
            }
            manager.__user = "Mimani";
            manager.__reason = req.body.reason ? req.body.reason : "Mimani changed this";
            manager.save(function (err) {
                if (err) {
                    Logger.error("Manager update error for managerId: " + req.params.employeeId);
                    return next(err);
                }
                res.json(manager);

            });
        } else {
            res.sendStatus(404);
            return next("Manager Not Found");

        }
    });
});

module.exports = router;