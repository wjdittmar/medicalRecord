const visitRouter = require("express").Router();
const { verifyTokenAndRole } = require("../middleware/authMiddleware");
const visitController = require("../controllers/visitController");

// Route to get all visits (admin and provider)
visitRouter.get("/", verifyTokenAndRole(["admin", "provider"]), visitController.getAllVisits);

// Route to create a new visit (admin and provider)
visitRouter.post("/", verifyTokenAndRole(["admin", "provider"]), visitController.createVisit);

// Route to get the total number of visits (admin and provider)
visitRouter.get("/total", verifyTokenAndRole(["admin", "provider"]), visitController.getTotalVisits);

// Route to get the number of visits between specified dates (admin and provider)
visitRouter.get("/date-between", verifyTokenAndRole(["admin", "provider"]), visitController.getVisitsBetweenDates);

// Route to update a visit (visible to admin and providers)
visitRouter.put("/:id", verifyTokenAndRole(["admin", "provider"]), visitController.updateVisit);

// Route to find a visit by zip code or encounter date
visitRouter.get("/search", verifyTokenAndRole(["admin", "provider"]), visitController.findVisit);

visitRouter.get("/by-provider/:providerId", verifyTokenAndRole(["admin", "provider"]), visitController.getVisitsByProvider);

module.exports = visitRouter;
