const router = require("express").Router();

const usersController = require("../../controllers/users");
const { loadUser } = require("../../middleware/users");

router.post("/", usersController.postCreateUser);

router.get("/:userId", loadUser, usersController.getUserById);

router.put("/:userId", loadUser, usersController.putUpdateUserById);

router.delete("/:userId", loadUser, usersController.deleteUserById);

module.exports = router;
