const AllPosters = require('../models/postersModel');
const Profile = require('../models/profilesModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// heloo
exports.posters = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const posterOne = await AllPosters.find({
        typeFilmNew: {
            //$eq: "film"
            $eq: "new"
        }
    }).limit(14);
    const posterTwo = await AllPosters.find({
        typeChamkakan: {  
            $eq: "chamkakan"
        }
    }).limit(14); // it must be 14

    const profile = await Profile.find({
        numOfPosters: {
            $gte: 5
        }
    })

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('home', {
        title: 'home page',
        posterOne,
        posterTwo,
        profile
    });
});

exports.getAllPosters = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const allPosters = await AllPosters.find();

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('allPosters', {
        title: 'all posters',
        allPosters
    });
}); 

exports.getArticle = catchAsync(async (req, res, next) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const article = await AllPosters.findOne({
        slug: req.params.slug
    })
    if (!article) {
        return next(new AppError('There is no article with that name.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('article', {
        title: `${article.title} Poster`,
        article
    });
});


exports.getProfiles = catchAsync(async (req, res, next) => {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const profile = await Profile.find({
        numOfPosters: {
            $gte: 5
        },
        typeNaxshandn: {
            $ne: "naxshandn"
        },
        typeDeveloper: {
            $ne: "developer"
        }
    })
 
    if (!profile) {
        return next(new AppError('There is no profile with that name.', 404));
    }

    const naxshandn = await Profile.find({
        typeNaxshandn: {
            $eq: "naxshandn"
        },
        typeDeveloper: {
            $ne: "developer"
        }
    })

    const developer = await Profile.find({
        typeDeveloper: {
            $eq: "developer"
        }
    })

    res.status(200).render('profile', {
        title: `${profile.title} Poster`,
        profile,
        naxshandn,
        developer
    });
});

exports.getPosterEachMember = catchAsync(async (req, res, next) => {
    
    const member = await AllPosters.find({
        memberNameEnglish: {
            $eq: req.params.slugMember
        }
    })

    const profile = await Profile.find({
        numOfPosters: {
            $gte: 5
        },
        typeNaxshandn: {
            $ne: "naxshandn"
        },
        typeDeveloper: {
            $ne: "developer"
        }
    })

    if (!member) {
        return next(new AppError('There is no article with that name.', 404));
    }

    // 2) Build template
    // 3) Render template using data from 1)
    res.status(200).render('posterEachMember', {
        title: `${member.title} Poster`,
        member,
        profile
    });
});

exports.getFilm = catchAsync(async (req, res, next) => {
    
    const film = await AllPosters.find({
        typeFilm: {
            $eq: "film"
        }
    }).limit(50);

    
    res.status(200).render('film', {
        title: 'film page',
        film
    });
});


exports.getTop = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const top = await AllPosters.find({
        typeTop: {
            $eq: "top"
        }
    });

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('top', {
        title: 'Top 250 movie rated',
        top
    });
});

exports.getVariety = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const variety = await AllPosters.find({
        typeVariety: {
            $eq: "variety"
        }
    }).limit(50);

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('variety', {
        title: 'variety',
        variety
    });
});

exports.getDirector = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const director = await AllPosters.find({
        typeDirector: {
            $eq: "director"
        }
    });

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('director', {
        title: 'director',
        director
    });
});

exports.getCompany = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const company = await AllPosters.find({
        typeCompany: {
            $eq: "company"
        }
    });

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('company', {
        title: 'company',
        company
    }).limit(50);
});

exports.getGift = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const gift = await AllPosters.find({
        typeGift: {
            $eq: "gift"
        }
    });

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('gift', {
        title: 'gift',
        gift
    }).limit(50);
});

exports.getChashn = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const chashn = await AllPosters.find({
        typeChashn: {
            $eq: "chashn"
        }
    }).limit(50);

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('chashn', {
        title: 'chashn',
        chashn
    });
});

exports.getSeries = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const series = await AllPosters.find({
        typeSeries: {
            $eq: "series"
        }
    }).limit(50);

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('series', {
        title: 'series',
        series
    });
});

exports.getChamkakan = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const chamkakan = await AllPosters.find({
        typeChamkakan: {
            $eq: "chamkakan"
        }
    }).limit(50);

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('chamkakan', {
        title: 'chamkakan',
        chamkakan
    });
});

exports.getActor = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const actor = await AllPosters.find({
        typeActor: {
            $eq: "actor"
        }
    }).limit(50);

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('actor', {
        title: 'actor',
        actor
    });
});


exports.createPoster = catchAsync(async (req, res, next) => {

    const doc = await AllPosters.create(req.body);

    res.status(201).json({
        // 201 stands for to create new tour
        status: 'success',
        data: {
            data: doc
        }
    });
});

// to change your remote to other existing remote using this steps
// git remote -v
// git remote set-url origin https://github.com/mohamednazm-web/tulibcinama.git
// git push -f origin master

// git add app.js
// git commit -m "changes"
// git add -A
// git push origin master


