"use strict";

exports.__esModule = true;
exports.default = void 0;
var _default = {
  headerFontFamily: ['Work Sans', 'sans-serif'],
  bodyFontFamily: ['Work Sans', 'sans-serif'],
  bodyWeight: 500,
  overrideThemeStyles: function overrideThemeStyles(vr, options, styles) {
    return {
      'h1,h2,h3,h4,h5,h6': {
        marginBottom: vr.rhythm(1 / 3)
      }
    };
  }
};
exports.default = _default;