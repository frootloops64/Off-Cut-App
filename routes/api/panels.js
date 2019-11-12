const router = require("express").Router();
const panelsController = require("../../controllers/panelsController");

router.route("/")
  .get(panelsController.findAll)
  .post(panelsController.create);


router
  .route("/:id")
  .get(panelsController.findById)
  .put(panelsController.update)
  .delete(panelsController.remove);


module.exports = router;

