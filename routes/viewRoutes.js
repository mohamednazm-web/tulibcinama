const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.posters);

router.get('/movies/:slug', viewsController.getArticle);

router.get('/profiles', viewsController.getProfiles);

router.get('/member/:slugMember', viewsController.getPosterEachMember);

router.get('/updateAllThings', viewsController.updatedAllThings);

router.get('/film', viewsController.getFilm);

router.get('/Top-250-movie-rated', viewsController.getTop);

router.get('/variety', viewsController.getVariety);

router.get('/director', viewsController.getDirector);

router.get('/company', viewsController.getCompany);

router.get('/gift', viewsController.getGift);

router.get('/chashn', viewsController.getChashn);

router.get('/series', viewsController.getSeries);

router.get('/chamkakan', viewsController.getChamkakan);

router.get('/actor', viewsController.getActor);

router.post('/createPoster', viewsController.createPoster);

router.get('/search', viewsController.search);

router.get('/login', viewsController.getLogin);

module.exports = router;
