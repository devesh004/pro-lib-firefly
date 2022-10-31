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

router.post(
  "/logo/imgUrl",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { img } = req.body;
    const name = await Project.findById(id);
    res.status(200).json(name);
  })
);

module.exports = router;
