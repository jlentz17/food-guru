const router = require("express").Router();
const sequelize = require("../config/connection");
const { Recipe, User, Category, Vote } = require("../models");
const withAuth = require("../utils/auth")

module.exports = router;
