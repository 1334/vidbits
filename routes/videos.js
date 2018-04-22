const router = require('express').Router();
const Video = require('../models/video');

router.get('/', (req, res) => {
  res.redirect(301, '/videos')
})

router.get('/videos', async (req, res) => {
  const videos = await Video.find({});
  res.render('videos/index', { videos });
});

router.get('/videos/create', (req, res) => {
  res.render('videos/create');
});

router.post('/videos', async (req, res) => {
  const {title, description} = req.body;
  const video = new Video({ title, description });
  video.validateSync();

  if (video.errors) {
    res.status(400).render('videos/create', { video, titleError: video.errors.title });
  } else {
    await video.save();
    res.status(201).render('videos/show', { video });
  }
});

module.exports = router;
