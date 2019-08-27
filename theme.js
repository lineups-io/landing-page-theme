"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getTheme = exports.base = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _typography = _interopRequireDefault(require("./typography.js"));

var headerFontFamily = _typography.default.headerFontFamily,
    bodyFontFamily = _typography.default.bodyFontFamily;
var base = {
  gutter: 15,
  colors: {
    primary: '#2E189B',
    secondary: '#FED141',
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    white: '#ffffff',
    black: '#333333'
  },
  fonts: {
    header: headerFontFamily.join(','),
    body: bodyFontFamily.join(',')
  }
};
exports.base = base;

var getTheme = function getTheme(theme, override) {
  if (theme === void 0) {
    theme = base;
  }

  if (override === void 0) {
    override = {};
  }

  return (0, _extends2.default)({
    nav: {
      container: "\n        background-color: " + theme.colors.black + ";\n        color: " + theme.colors.white + ";\n      ",
      logo: "\n        height: 100%;\n        padding: " + theme.gutter + "px 0;\n\n        polygon, path {\n          fill: " + theme.colors.white + ";\n        }\n      ",
      link: "\n        text-transform: uppercase;\n        font-size: 0.8em;\n        letter-spacing: 1px;\n        font-weight: bold;\n        background-color: " + theme.colors.black + ";\n        color: " + theme.colors.white + ";\n        border-width: 0 0 2px 0;\n        border-style: solid;\n        border-color: " + theme.colors.black + ";\n        text-decoration: none;\n\n        &:hover, &[href]:hover {\n          color: " + theme.colors.white + ";\n          text-decoration: none;\n          border-color: " + theme.colors.white + ";\n        }\n\n        &[aria-haspopup]::after {\n          border-top-color: " + theme.colors.white + "\n        }\n      ",
      menu: {
        container: "\n          background-color: " + theme.colors.black + ";\n        ",
        hamburger: "\n          background-color: " + theme.colors.white + ";\n        ",
        link: "\n          padding: " + theme.gutter * 2 / 3 + "px 0;\n          display: flex;\n          justify-content: center;\n          border-bottom-width: 3px;\n          font-size: 1.5em;\n        "
      }
    },
    main: {
      container: "\n        background-color: " + theme.colors.white + "\n      ",
      title: "\n        margin: 0;\n        font-size: 2.5rem;\n        font-weight: 500;\n      ",
      description: "\n        font-weight: lighter;\n        font-size: 1.25em;\n        color: " + theme.colors.gray['700'] + ";\n      ",
      disclaimer: "\n        font-size: 0.9em;\n        color: " + theme.colors.gray['700'] + ";\n      "
    },
    card: {
      body: "\n        background-color: " + theme.colors.white + ";\n        border-width: 2px;\n        border-style: solid;\n        border-color: " + theme.colors.gray['200'] + ";\n\n        margin: " + theme.gutter * -2 + "px " + theme.gutter + "px 0;\n        z-index: 1000;\n\n        @media (min-width: 768px) {\n          margin: " + theme.gutter * -1 + "px " + theme.gutter + "px 0 " + theme.gutter + "px;\n          border-width: 1px;\n        }\n      ",
      hover: "\n        border-color: " + theme.colors.gray['200'] + ";\n        box-shadow: " + theme.colors.primary + " 0 0 " + theme.gutter * 2 / 3 + "px " + theme.gutter * -1 / 3 + "px;\n      ",
      title: "\n        color: " + theme.colors.black + ";\n        font-size: 1.25em;\n        line-height: 1em;\n      ",
      address: "\n        color: " + theme.colors.gray['700'] + ";\n        font-size: 1em;\n        font-weight: lighter;\n      ",
      bedrooms: "\n        text-transform: uppercase;\n        color: " + theme.colors.gray['700'] + ";\n        font-size: 0.9em;\n        font-weight: lighter;\n      ",
      amount: "\n        font-size: 1.1em;\n        color: " + theme.colors.black + ";\n      ",
      adLabel: "\n        color: " + theme.colors.black + ";\n        background-color: " + theme.colors.white + ";\n        box-shadow: 0 0 2px 2px " + theme.colors.gray['300'] + ";\n      "
    },
    link: "\n      display: block;\n      color: " + theme.colors.gray['700'] + ";\n\n      border: 0;\n      background-color: transparent;\n      padding: 0;\n\n      &[href] {\n        cursor: pointer;\n        text-decoration: none;\n      }\n\n      &[href]:hover {\n        text-decoration: underline;\n        color: " + theme.colors.black + ";\n      }\n    ",
    button: {
      primary: "\n        background-color: " + theme.colors.black + ";\n        border-color: " + theme.colors.black + ";\n        color: " + theme.colors.white + ";\n\n        &[href]:hover {\n          color: " + theme.colors.white + ";\n        }\n      ",
      danger: "\n        background-color: red;\n        border-color: red;\n        color: " + theme.colors.white + ";\n\n        &[href]:hover {\n          color: " + theme.colors.white + ";\n        }\n      ",
      outline: "\n        background-color: " + theme.colors.white + ";\n      ",
      default: "\n        border-width: 1px;\n        border-style: solid;\n        border-color: " + theme.colors.gray['300'] + ";\n        background-color: " + theme.colors.gray['200'] + ";\n        color: " + theme.colors.gray['700'] + ";\n\n        &::after {\n          border-color: " + theme.colors.gray['700'] + ";\n        }\n      ",
      link: "\n        border-color: " + theme.colors.white + ";\n        background-color: " + theme.colors.white + ";\n      ",
      disabled: "\n        color: " + theme.colors.gray['300'] + ";\n        background-color: " + theme.colors.gray['200'] + ";\n        border-color: " + theme.colors.gray['200'] + ";\n      "
    },
    dropdown: {
      toggle: "\n        &::after {\n          content: \" \";\n          border-left: 5px solid transparent;\n          border-right: 5px solid transparent;\n          border-top-width: 5px;\n          border-top-style: solid;\n          border-top-color: " + theme.colors.gray['700'] + ";\n          margin-left: 10px;\n          margin-right: -5px;\n        }\n      ",
      menu: "\n        background-color: " + theme.colors.white + ";\n        border-width: 1px;\n        border-style: solid;\n        border-color: " + theme.colors.gray['200'] + ";\n      ",
      header: "\n        color: " + theme.colors.gray['700'] + ";\n        font-weight: bold;\n      ",
      item: "\n        color: " + theme.colors.gray['700'] + ";\n        font-size: 0.9em;\n\n        &:hover, &[href]:hover {\n          color: " + theme.colors.black + ";\n          background-color: " + theme.colors.gray['200'] + ";\n          text-decoration: none;\n        }\n\n        &[aria-current='page'], &.active {\n          color: " + theme.colors.white + ";\n          background-color: " + theme.colors.primary + ";\n          &[href]:hover {\n            color: " + theme.colors.white + ";\n            background-color: " + theme.colors.primary + ";\n          }\n        }\n      "
    },
    well: "\n      background-color: " + theme.colors.gray['200'] + ";\n      color: " + theme.colors.gray['700'] + ";\n\n      h2 {\n        color: " + theme.colors.black + ";\n      }\n\n      a {\n        display: inline;\n        color: " + theme.colors.gray['700'] + ";\n        box-shadow: " + theme.colors.primary + " 0px -2px 0px inset;\n        text-decoration: none;\n        transition: background 0.15s cubic-bezier(0.33, 0.66, 0.66, 1) 0s;\n        border-width: 0 0 2px 0;\n        border-style: solid;\n        border-color: " + theme.colors.primary + ";\n      }\n\n      a[href]:hover {\n        text-decoration: none;\n      }\n    ",
    related: {
      header: "\n        font-size: 1em;\n        font-weight: bold;\n        color: " + theme.colors.gray['700'] + ";\n      ",
      link: "\n        font-size: 0.9em;\n        color: " + theme.colors.gray['700'] + ";\n\n        &[href]:hover {\n          color: " + theme.colors.black + ";\n          text-decoration: underline;\n        }\n      "
    },
    footer: {
      container: "\n        background-color: " + theme.colors.black + ";\n        color: " + theme.colors.white + ";\n        border-width: 1px 0 0 0;\n        border-style: solid;\n        border-color: " + theme.colors.black + ";\n      ",
      header: "\n      ",
      link: "\n        color: " + theme.colors.white + ";\n\n        svg * {\n          fill: " + theme.colors.white + ";\n        }\n\n        svg:hover * {\n          fill: " + theme.colors.white + ";\n        }\n\n        & {\n          cursor: pointer;\n        }\n\n        &[href]:hover {\n          text-decoration: underline;\n          color: " + theme.colors.white + ";\n        }\n      "
    },
    label: "\n      color: " + theme.colors.gray['700'] + ";\n      font-size: .9em;\n    ",
    slider: {
      text: "\n        color: " + theme.colors.gray['700'] + ";\n      ",
      background: "\n        background-color: " + theme.colors.gray['200'] + ";\n      ",
      handle: "\n        background: " + theme.colors.white + ";\n        border-color: " + theme.colors.gray['200'] + ";\n      ",
      progressBar: "\n        background-color: " + theme.colors.primary + ";\n      "
    },
    map: {
      container: "\n        background-color: " + theme.colors.gray['200'] + ";\n      ",
      pin: {
        active: "\n          fill: " + theme.colors.secondary + ";\n        ",
        default: "\n          fill: " + theme.colors.primary + ";\n        "
      },
      cluster: "\n        color: " + theme.colors.white + ";\n\n        svg * {\n          fill: " + theme.colors.secondary + ";\n        }\n      "
    }
  }, theme, {}, override);
};

exports.getTheme = getTheme;