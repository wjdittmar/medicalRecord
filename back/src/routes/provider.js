const providerRouter = require("express").Router();
const { verifyTokenAndRole } = require("../middleware/authMiddleware");
const providerController = require("../controllers/providerController");

// Route to get the total number of providers (visible to admin and providers)
providerRouter.get("/total", verifyTokenAndRole(["admin", "provider"]), providerController.getTotalProviders);

// Route to get all providers (visible to admin and providers)
providerRouter.get("/", verifyTokenAndRole(["admin", "provider"]), providerController.getAllProviders);

// Route to get total providers by state (visible to admin and providers)
providerRouter.get("/state", verifyTokenAndRole(["admin", "provider"]), providerController.getProvidersByState);

// Route to create a new provider (visible to admin and providers)
providerRouter.post("/", verifyTokenAndRole(["admin", "provider"]), providerController.createProvider);

// Route to update a provider (visible to admin and providers)
providerRouter.put("/:id", verifyTokenAndRole(["admin", "provider"]), providerController.updateProvider);

module.exports = providerRouter;
