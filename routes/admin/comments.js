const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('it work');
});

module.exports = router;
