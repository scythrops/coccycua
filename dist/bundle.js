"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var babel = require('babel-core');

var DEFAULT_BABEL_OPTIONS = {
  "presets": ["es2015", "stage-2"]
};

var Coccycua = exports.Coccycua = function () {
  function Coccycua() {
    var scope = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Coccycua);

    this.scope = scope;
    this.babelOptions = options.babel || DEFAULT_BABEL_OPTIONS;
  }

  _createClass(Coccycua, [{
    key: "compile",
    value: function compile(source, callback) {
      var _this = this;

      try {
        var _ret = function () {
          var scopeNames = _this._scopeNames;
          var src = babel.transform("(" + scopeNames.join(',') + ")=>{" + source + "}", _this.babelOptions);
          var scope = _this._scope;
          var scopeValues = _this._scopeValues;
          var raw = src.code.replace(/^('|"|`)use strict('|"|`);{0,1}/, '').trim();
          var segments = raw.split('\n');
          var real = segments.slice(1, segments.length - 1);
          var code = real.join('\n');
          var f = new Function(_this._scopeNames, code);
          var handler = function handler() {
            return f.apply(undefined, _toConsumableArray(scopeValues));
          };
          if (typeof callback === 'function') {
            return {
              v: setImmediate(function () {
                return callback(null, handler);
              })
            };
          }
          return {
            v: handler
          };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      } catch (e) {
        if (typeof callback === 'function') {
          return setImmediate(function () {
            return callback(e);
          });
        }
        return e;
      }
    }
  }, {
    key: "compileFunction",
    value: function compileFunction(source, callback) {
      var _this2 = this;

      try {
        var _ret2 = function () {
          var src = babel.transform(source, _this2.babelOptions);
          var scopeNames = _this2._scopeNames;
          var scopeValues = _this2._scopeValues;
          var raw = src.code.replace(/^('|"|`)use strict('|"|`);{0,1}/, '').trim();
          var f = new Function(scopeNames, "return " + raw);
          if (typeof callback === 'function') {
            return {
              v: setImmediate(function () {
                return callback(null, f.apply(undefined, _toConsumableArray(scopeValues)));
              })
            };
          }
          return {
            v: f.apply(undefined, _toConsumableArray(scopeValues))
          };
        }();

        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
      } catch (e) {
        if (typeof callback === 'function') {
          return setImmediate(function () {
            return callback(e);
          });
        }
        return e;
      }
    }
  }, {
    key: "scope",
    set: function set(newScope) {
      var _this3 = this;

      this._scope = Object.assign({}, newScope);
      this._scopeNames = Object.keys(this._scope);
      this._scopeValues = this._scopeNames.map(function (name) {
        return _this3._scope[name];
      });
    },
    get: function get() {
      return this._scope;
    }
  }]);

  return Coccycua;
}();
