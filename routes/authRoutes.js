const { Login, Signup } = require("../controllers/authControllers");
const express = require("express");
const router = express.Router();

// Login route
router.post('/login', Login);

// Signup route
router.post('/signup', Signup);


module.exports = router;


