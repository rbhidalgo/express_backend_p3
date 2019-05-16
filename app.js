const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session')


require('./db/db')

console.log(process.env.MY_SECRET)

const apiRouter = require('./routes/api');
const usersRouter = require('./routes/users');
const User = require('./models/User')


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "random string",
    resave: false,
    saveUninitialized: false
  })
);

app.use('/api/v1', apiRouter);
app.use('/users', usersRouter);
app.post('/locations', async (req, res) => {
  const foundUser = await User.findById
  (req.body.currentUser._id)
  // console.log(foundUser)
  const location = {
    id: req.body.id,
    name: req.body.name
  }
  foundUser.locations.push(location)
  await foundUser.save()
  res.json({
  user: foundUser
  })
})

app.post('/locations/crawl', async (req, res) => {
  const foundUser = await User.findById
  (req.body.currentUser._id)
  // console.log(foundUser)
  const crawlLocations = req.body.randomCrawl
  for (let i = 0; i < crawlLocations.length; i++) {
    const location = {
      id: crawlLocations[i].id,
      name: crawlLocations[i].name
    } 
    foundUser.locations.push(location)
  }
  console.log(foundUser.locations);
  
  await foundUser.save()
  res.json({
  user: foundUser
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
