const express = require("express");
const router = express.Router();

// Main router
router.get("/", (req, res) => {
  res.send("server is up on running");
});

module.exports = router;
