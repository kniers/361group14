var mysql = require('mysql');
var pool = mysql.createPool({
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kniers',
  password        : '7685',
  database        : 'cs340_kniers'
});
module.exports.pool = pool;
