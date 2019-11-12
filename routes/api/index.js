const router = require("express").Router();
const panelRoutes = require("./panels");

router.use("/panels", panelRoutes);

module.exports = router;

