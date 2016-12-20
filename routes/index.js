const express = require('express');
const router = express.Router();

const displayPlayerNews = require('./fantasy/displayPlayerNews.js');
const displayPlayerNewsArchives = require('./fantasy/displayPlayerNewsArchives.js');
const displayWeeklyLeaders = require('./fantasy/displayWeeklyLeaders.js');
const displayWeeklyLeadersByWeek = require('./fantasy/displayWeeklyLeadersByWeek.js');
const renderWeeklyLeaders = require('./web/renderWeeklyLeaders.js'); 
const renderWeeklyLeadersByWeek = require('./web/renderWeeklyLeadersByWeek.js');

/* REST API */
router.get('/fantasy/news', displayPlayerNews);
router.get('/fantasy/news/archive', displayPlayerNewsArchives);
router.get('/fantasy/leaders', displayWeeklyLeaders);
router.get('/fantasy/leaders/:id', displayWeeklyLeadersByWeek);

/* Handlebar views */
router.get('/leaders', renderWeeklyLeaders);
router.get('/leaders/:id', renderWeeklyLeadersByWeek);

router.get('/*', (req, res) => {
 res.redirect('/leaders');
});

module.exports = router;
