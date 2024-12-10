"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMemberships = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Fetch all memberships
var fetchMemberships = function fetchMemberships() {
  var response;
  return regeneratorRuntime.async(function fetchMemberships$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get('/api/memberships'));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error('Error fetching memberships:', _context.t0);
          throw new Error(_context.t0.message);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.fetchMemberships = fetchMemberships;