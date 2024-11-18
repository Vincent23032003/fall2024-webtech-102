// /api/src/routes/profile.js
const express = require('express');
const router = express.Router();

// Mock user data (simulate logged-in user)
const mockUser = {
  username: "JohnDoe",
  email: "johndoe@example.com"
};

// Middleware to simulate authentication
function isAuthenticated(req, res, next) {
  const isLoggedIn = true; // Replace with real authentication logic
  if (isLoggedIn) {
    req.user = mockUser; // Attach user data to the request
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// Profile route
router.get('/profile', isAuthenticated, (req, res) => {
  res.json({
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = router;
