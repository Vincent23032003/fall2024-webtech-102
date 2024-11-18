const express = require('express');
const router = express.Router();
const { registerUser } = require('../api/register');

router.post('/', registerUser);

module.exports = router;