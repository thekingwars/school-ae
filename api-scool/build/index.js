"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//variables
const app = (0, _express.default)();
const NODE_ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `.env.${NODE_ENV}`
}); //options


app.set('port', 3000 || process.env.PORT); //middlewares

app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('dev')); //static routes

app.use(_express.default.static(_path.default.join(__dirname, 'public'))); //routes

app.use('/api', _index.default); //server

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});