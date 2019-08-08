"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _theme = require("./theme.js");

var _typography = _interopRequireDefault(require("./typography"));

var _default = {
  base: _theme.base,
  getTheme: _theme.getTheme,
  typography: _typography.default
};
exports.default = _default;