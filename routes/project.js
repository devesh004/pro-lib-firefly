const axios = require("axios");
const express = require("express");
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
} = require("../controllers/projects");
const Project = require("../models/Project");
const wrapAsync = require("../utils/wrapAsync");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(protect, createProject).get(getAllProjects);

router.route("/:id").get(getProject).put(updateProject);

module.exports = router;
