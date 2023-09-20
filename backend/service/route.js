const express = require("express");
const {
  getAll,
  getByName,
  filterCountries,
  register,
} = require("../controller/controller.js");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

//Register a user.

router.post("/user/register", register);

// Return AllCountries in paginated form.
router.get("/Allcountries", authenticateToken, getAll);

// Return AllCountries in paginated form.
router.get("/", authenticateToken, getAll);

// Return Countries having specific name.
router.get("/Allcountries/:name", authenticateToken, getByName);

// Filter out countries on the basis of populationMin, populationMax, areaMin, areaMax, language,
// and sort the countries in asc/desc order on the basis of population or area.

router.get("/countries", authenticateToken, filterCountries);

module.exports = router;
