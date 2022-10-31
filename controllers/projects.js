const User = require("../models/User.js");
const Project = require("../models/Project");
const ErrorResponse = require("../utils/ErrorResponse.js");
const wrapAsync = require("../utils/wrapAsync.js");

// @desc     Create a project
// @route    POST /api/projects
// @access   Private
module.exports.createProject = wrapAsync(async (req, res, next) => {
  console.log(req.body);
  const newProject = new Project(req.body);
  const savedProject = await newProject.save();
  res.status(200).json(savedProject);
});

// @desc     Edit a project
// @route    PUT /api/projects/:id
// @access   Private
module.exports.updateProject = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findByIdAndUpdate(id, req.body);
  res.status(200).json(project);
});

// @desc     get all projects
// @route    GET /api/projects
// @access   Public
module.exports.getAllProjects = wrapAsync(async (req, res, next) => {
  console.log(req.query);
  let qs = {};
  if (req.query.college) {
    qs.college = req.query.college;
  }
  if (req.query.domains) {
    qs.domain = { $in: req.query.domains };
  }
  // if (req.query.hashTags !== undefined) {
  //   qs.hashTag = { $in: req.query.hashTags };
  // }
  const sortAs = req.query.sort;
  console.log(qs);
  let pr = await Project.find(qs);
  let projects = [];
  let ans;
  if (pr.length == 0) res.status(200).json(pr);
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
});

// @desc     get a project
// @route    GET /api/projects/:id
// @access   Public
module.exports.getProject = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  const repo = project.githubRepo.substr(19);
  const finalRepo = "https://api.github.com/repos/" + repo;
  const result = await axios.get(finalRepo);
  const contributorsURL = result.data.contributors_url;
  const desc = result.data.description;
  const con = await axios.get(contributorsURL);
  const contributors = con.data.length;
  const obj = { desc, contributors };
  res.status(200).json(obj);
});
