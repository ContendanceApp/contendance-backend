var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var beaconRouter = require('./routes/BeaconRoute');
var devicesRouter = require('./routes/DevicesRoute');
var presenceRouter = require('./routes/PresencesRoute');
var rolesRouter = require('./routes/RolesRoute');
var roomsRoute = require('./routes/RoomsRoute');
var schedulesRoute = require('./routes/SchedulesRoute');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/beacons', beaconRouter);
app.use('/devices', devicesRouter);
app.use('/presences', presenceRouter);
app.use('/roles', rolesRouter);
app.use('/rooms', roomsRoute);
app.use('/schedules', schedulesRoute);

module.exports = app;
