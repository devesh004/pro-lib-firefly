const { default: axios } = require("axios");
const express = require("express");
const Project = require("../models/project");
const wrapAsync = require("../utils/wrapAsync");

const router = express.Router();

router.post(
  "/newProject",
  wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  })
);

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    console.log(req.query);
    let qs = {};
    if (req.query.college) {
      qs.college = req.query.college;
    }
    if (req.query.domain) {
      qs.domain = { $in: req.query.domains };
    }
    if (req.query.hashTags) {
      qs.hashTag = { $in: req.query.hashTags };
    }
    const sortAs = req.query.sort;
    //sorts with con number
    //sorts with stars
    //sorts with forks
    let pr = await Project.find(qs);
    pr.forEach(async (project) => {
      if (project.githubRepo) {
        const repo = project.githubRepo?.substr(19);
        const finalRepo = "https://api.github.com/repos/" + repo;
        // console.log(finalRepo);
        const res = project.githubRepo && (await axios.get(finalRepo));
        console.log(res.data.forks);
        // pr.forks=res.da
      }
    });
    res.status(200).json(pr);
  })
);

module.exports = router;
