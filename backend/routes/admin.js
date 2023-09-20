const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const adminController = require("../controllers/adminController");
router.post("/addEvent", adminController.addEvent);
router.put("/updateEvent/:id", adminController.updateEvent);
router.delete("/deleteEvent", adminController.deleteEvent);
router.get("/getAllDoctors", adminController.getAllDoctors);

//protected routes
router.use(requireAuth);
router.delete("/deleteClaim/:id", adminController.deleteClaim);
router.get("/markClaimAsProcessed/:id", adminController.markClaimAsProcessed);
router.get("/pendingClaims", adminController.pendingClaims);
router.get("/getAllUsers", adminController.getAllUsers);
router.post("/changeAccountStatus", adminController.changeAccountStatus);

module.exports = router;
