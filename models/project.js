const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const User = require("./user");

const ProjectSchema = new mongoose.Schema(
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
          "Transportation & Logistics",
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

module.exports = mongoose.model("Project", ProjectSchema);
