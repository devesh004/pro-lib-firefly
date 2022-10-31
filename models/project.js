const mongoose = require("mongoose");
const User = require("./User");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project Name is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    college: {
      type: String,
      required: [true, "Add your college name"],
    },
    contributors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    domain: [
      {
        type: String,
        enum: [
          "Agriculture,FoodTech and Rural Development",
          "Blockchain and Cybersecurity",
          "Clean and Green Technology",
          "Fitness and Sports",
          "Heritage and Culture",
          "MedTech / BioTech / HealthTech",
          "Renewable / Sustainable Energy",
          "Robotics and Drones",
          "Smart Automation",
          "Smart Vehicles",
          "Travel and Tourism",
          "Transportation and Logistics",
          "Disaster Management",
          "Smart Education",
          "Image Processing",
          "Embedded Systems",
          "Networking",
          "Miscellaneous",
        ],
        required: true,
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      required: true,
    },
    githubRepo: {
      type: String,
      required: true,
    },
    hashTag: [
      {
        type: String,
        lowercase: true,
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
