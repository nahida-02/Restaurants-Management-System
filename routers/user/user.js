const express = require("express");

const { redirect } = require("express/lib/response");
const DB_user = require("../../DB_codes/DB_user");
const DB_watchlist = require("../../DB_codes/DB_watchlist");
const router = express.Router({ mergeParams: true });


