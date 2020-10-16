const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.posters);

router.get('/movies/:slug', viewsController.getArticle);

router.get('/profiles', viewsController.getProfiles);

router.get('/member/:slugMember', viewsController.getPosterEachMember);

router.get('/all', viewsController.getAllPosters);

router.get('/film', viewsController.getFilm);

router.get('/Top-250-movie-rated', viewsController.getTop);

router.get('/variety', viewsController.getVariety);

router.get('/director', viewsController.getDirector);

router.get('/company', viewsController.getCompany);

router.get('/gift', viewsController.getGift);

router.get('/chashn', viewsController.getChashn);

router.get('/series', viewsController.getSeries);



module.exports = router;