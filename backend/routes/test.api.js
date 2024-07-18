const express = require('express');
const Test = require('../models/test.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const tests = await Test.findAll();
  res.json(tests);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const test = await Test.create({ name, email });
  res.json(test);
});

module.exports = router;