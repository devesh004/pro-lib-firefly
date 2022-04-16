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
    let projects = [];
    let ans;
    pr.forEach(async (project, ind) => {
      let gitData;
      if (project.githubRepo) {
        const repo = project.githubRepo.substr(19);
        const finalRepo = "https://api.github.com/repos/" + repo;
        const result = await axios.get(finalRepo);
        // console.log(result.data);
        gitData = {
          forks: result.data.forks,
          issues: result.data.open_issues,
          stars: result.data.stargazers_count,
        };

        // project.forks = result.data.forks;
        // project.issues = result.data.open_issues;
        // project.stars = result.data.stargazers_count;
        // console.log(project);
      }
      const pro = { ...project, gitData };
      projects.push({ ...pro._doc, ...gitData });
      // console.log(pro._doc);
      if (ind === pr.length - 1) {
        res.status(200).json(projects);
      }
    });
  })
);

router.put(
  "/edit/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body);
    res.status(200).json(project);
  })
);

router.post(
  "/hashTag/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { hashTag } = req.body;
    let project = await Project.findById(id);
    project.hashTag.push(hashTag);
    res.status(200).json(project);
  })
);

module.exports = router;
