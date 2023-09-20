const express = require("express");
const axios = require("axios");
const User = require("../service/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "MY_SECRET_KEY"; // Load your secret key from a config file

// 1. Register user in the code itself.

const register = async (req, res) => {
  try {
    const { _id, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = User.find((obj) => email === obj.email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all details" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = {
      _id: _id,
      email: email,
      password: hashedPassword,
    };

    // Save the user to the database
    User.push(user);
    console.log(User);

    // Generate a JWT token
    const token = jwt.sign({ email: user.email, _id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ message: "User registered successfully", token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// 2. Fetch data related to countries.

let allCountriesData = null; // Variable to store the fetched data

// Create a function to fetch and store data
const fetchData = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all"); // Replace with the actual API URL
    allCountriesData = response.data; // Store the fetched data in the variable
    console.log("Data fetched and stored successfully");
  } catch (error) {
    console.error("Error fetching data from the API:", error.message);
  }
};
// Fetch data

fetchData();

// 3. For rendering All  Countries

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const perPage = parseInt(req.query.perPage) || 10; // Default to 10 items per page

  // Calculate the offset based on page and perPage
  const offset = (page - 1) * perPage;

  // Perform pagination
  const paginatedData = allCountriesData.slice(offset, offset + perPage);

  res.json({
    page: page,
    perPage: perPage,
    data: paginatedData,
  });

  //    res.status(202).send(countryData);
};

// 4. Return countries by specific name

const getByName = async (req, res) => {
  var countryName = req.params.name;
  console.log(countryName);

  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const countrydata = response.data;

  countrydata.filter((country) => {
    console.log(country.languages);
  });

  res.status(202).send(countrydata);
};

// 5. Filter using mulitple params

const filterCountries = async (req, res) => {
  let {
    populationMin,
    populationMax,
    areaMin,
    areaMax,
    language,
    sort,
    basis,
  } = req.query;

  console.log(req.method);
  // Filter countries based on population, area, and language
  let filteredCountries = allCountriesData.filter((country) => {
    const LangData = country.languages;

    return (
      (!populationMin || country.population >= parseInt(populationMin)) &&
      (!populationMax || country.population <= parseInt(populationMax)) &&
      (!areaMin || country.area >= parseInt(areaMin)) &&
      (!areaMax || country.area <= parseInt(areaMax)) &&
      (!language || (LangData && LangData[language]))
    );
  });

  // Sort the filtered countries

  //On the basis of population

  if (basis === "population") {
    if (sort === "asc") {
      filteredCountries = filteredCountries.sort(
        (a, b) => a.population - b.population
      );
    } else if (sort === "desc") {
      filteredCountries = filteredCountries.sort(
        (a, b) => b.population - a.population
      );
    }
  }

  //On the basis of area
  if (basis === "area") {
    if (sort === "asc") {
      filteredCountries = filteredCountries.sort((a, b) => a.area - b.area);
    } else if (sort === "desc") {
      filteredCountries = filteredCountries.sort((a, b) => b.area - a.area);
    }
  }
  // Extract and send the names of the filtered and sorted countries
  const countryNames = filteredCountries.map((country) => country.name.common);

  res.json(countryNames);
};

module.exports = { register, getAll, getByName, filterCountries };
