const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AllPosters = require('../../models/postersModel');
const Profile = require('../../models/profilesModel');

dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE

const allPosters = JSON.parse(
  fs.readFileSync(`${__dirname}/allPosters.json`, 'utf-8')
);
const profiles = JSON.parse(
  fs.readFileSync(`${__dirname}/profiles.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    //await Tour.create(tours);
    //await User.create(users, {
    //validateBeforeSave: false
    //});
    //await Review.create(reviews);
    await AllPosters.create(allPosters);
    await Profile.create(profiles);
    //await Article.create(articles);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    //await Article.deleteMany();
    await AllPosters.deleteMany();
    await Profile.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

/////////////////////////////////////////

//la xwarawa plusaka dagraw consoleki tr bkawa pashan awana bnusa
// node .\dev-data\data\import-dev-data.js
// node .\dev-data\data\import-dev-data.js --import
// node .\dev-data\data\import-dev-data.js --delete

/*const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");
const Review = require("./../../models/reviewModel");
const User = require("./../../models/userModel");

// dabe la pesh const app betn // bas la bo servery aw coda pewista la filakani trish datwani rastaw xo process.env.anything bakar bene.
dotenv.config({
  path: "./config.env"
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//.connect(process.env.DATABASE_LOCAL, {
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, "utf-8")
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await Review.create(users, {
      validateBeforeSave: false
    });
    await User.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await Review.deleteMany();
    await User.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// bo delete krdnw import krdn ema callyan nakayn balkw ba command line runyan dakean baw sheway xwarawa

/*1.console.log(process.argv); bnusa 
2.bo fily xwendraw dabe ${__dirname} ben
3.la xwarawa plusaka dagraw consoleki tr bkawa pashan awana bnusa 
// node .\dev-data\data\import-dev-data.js
// node .\dev-data\data\import-dev-data.js --import
// node .\dev-data\data\import-dev-data.js --delete
*/
//console.log(process.argv);
/*
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}*/
