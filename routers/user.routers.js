const { Router } = require("express");
const { createUser, getUser, updateUser, deleteUser, login, getData } = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/auth");

const router = Router();

router.post("/createuser", createUser);
router.get("/getuser", getUser);
router.patch("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);
router.post("/login", login);
router.post("/getdata", authenticateToken, getData);

module.exports = router;