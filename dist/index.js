"use strict";

var _gapi = require("./gapi");

var _gapi2 = _interopRequireDefault(_gapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const client = new _gapi2.default();
client.downloadImages();