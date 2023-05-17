module.exports = app => {
  const devices = require("../controllers/device.controller.js");

  let router = require("express").Router();

  // Create a new Device
  router.post("/", devices.create);

  // Retrieve all Devices
  router.get("/", devices.findAll);

  // Retrieve all published Devices
  router.get("/published", devices.findAllPublished);

  // Retrieve a single Device with id
  router.get("/:id", devices.findOne);

  // Update a Device with id
  router.put("/:id", devices.update);

  // Delete a Device with id
  router.delete("/:id", devices.delete);

  //router.get("/", devices.findAllCondition);

  // Delete all Devices
  router.delete("/", devices.deleteAll);

  app.use("/api/devices", router);


};
