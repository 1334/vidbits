const router = require('express').Router();

router.post('/videos', (req, res) => {
  res.status(201).send();
});

module.exports = router;
