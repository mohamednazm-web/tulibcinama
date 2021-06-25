const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
//const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
//const globalErrorHandler = require("./controllers/errorController");
//const tourRouter = require("./routes/tourRoutes");
//const userRouter = require("./routes/userRoutes");
//const reviewRouter = require("./routes/reviewRoutes");
//const bookingRouter = require("./routes/bookingRoutes");
const viewRouter = require('./routes/viewRoutes');
const profileRouter = require('./routes/profileRoutes');

// start express app
const app = express();

const fs = require("fs");
const multer = require("multer");


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "imageProfile") {
      cb(null, 'images/profile');
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "imageProfile") {
      cb(null, `${new Date().toISOString().replace(/:/g, '-')}${file.originalname}`);
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



app.use(cors());

app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
  {
    name: 'imageProfile',
    maxCount: 1
  }
]));


//app.use(helmet());

// Development body
if (process.env.NODE_ENV === 'development') {
  // its availabel in every single file becasue already have in process.
  app.use(morgan('dev')); // requst send kaw tamashay consle bka
}

// limit request from same API
const limiter = rateLimit({
  // 100 request datwanre bnerdre la maway 1 houri
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); // "email": {"$gt": ""}

app.use(xss()); // html form attacks

// Prevent parameter pollution
// {{URL}}api/v1/tours?sort=duration&sort=price its work now
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

app.use(compression());

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '30000kb'
  })
); // its need when you use post api
app.use(
  express.urlencoded({
    extended: true,
    limit: '30000kb'
  })
);
app.use(cookieParser());

// Test middleware
app.use((req, res, next) => {
  // must ne write in global before all of the routs if you dont do that its not work
  // its has been activate in every requset
  //console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  req.requsetTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

// 2) ROUTS

/*app.get('/', (req, res) => {
  res.status(200).render('base');
});
*/

app.use('/', viewRouter);
app.use('/', profileRouter);

app.use('/api/v1/posters', viewRouter);
app.use('/api/v1', viewRouter);
app.use('/api/v1/profile', profileRouter);

//app.use("/api/v1/tours", tourRouter); // using this middle wear for this rout // after all of them is comes
//app.use("/api/v1/users", userRouter);
//app.use("/api/v1/reviews", reviewRouter);
//app.use("/api/v1/bookings", bookingRouter);

app.all('*', (req, res, next) => {
  /* res.status(404).json({
     status: 'fail',
     message: `Can not find ${req.originalUrl} on this server!`
   }); */
  /*
  const err = new Error(`Can not find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);*/
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

// START THE SERVER

module.exports = app;
