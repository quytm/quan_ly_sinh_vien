var express = require('express');
var mysql = require('mysql');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Danh sách sinh viên' });
});

router.get('/sv/:mssv', function (req, res, next) {
  res.render('details', {title: 'Thông tin chi tiết'});
});

router.get('/add', function (req, res, next) {
  res.render('add_new_sv', {title: 'Thêm sinh viên mới'});
});

router.get('/sv/edit/:mssv', function (req, res, next) {
  res.render('edit_sv', {title: 'Sửa thông tin sinh viên'});
});

var config = {
  host    : 'localhost',
  user    : 'root',
  password: '1234',
  database: 'qly_svien_node'
};
var connection = mysql.createConnection(config);
connection.connect(function (err) {
  if (err){

  }
});

router.get('/api/listsv', function(req, res, next) {
  connection.query('SELECT * FROM sinhvien', function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

router.get('/api/sv/:mssv', function (req, res) {
  var query = 'SELECT * FROM sinhvien WHERE mssv = "' + req.params.mssv + '"';
  console.log('Query = ' + query);

  connection.query(query, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });
});

router.get('/api/delete/:mssv', function (req, res) {
  connection.query('DELETE FROM sinhvien WHERE mssv = ' + req.params.mssv, function (err, rows, fields) {
    if (err) throw err;
  });

  res.end('deleted');
});

router.post('/api/add_new', function (req, res) {
  var query = 'INSERT INTO `sinhvien` (`mssv`, `hoten`, `ngaysinh`, `tinchi`) VALUES (' +
      '"' + req.body.mssv + '",' +
      '"' + req.body.hoten + '",' +
      '"' + req.body.ngaysinh + '",' +
      '"' + req.body.tinchi + '"' +
      ');';

  console.log('query = ' + query);

  connection.query(query, function (err, result) {
    if (err) {
      res.end('Failed');
    }
    console.log(result);
  });

  res.end('Complete');
});

router.post('/api/edit', function (req, res) {
  var query = ' UPDATE sinhvien SET ' +
      'hoten = "' + req.body.hoten + '", ' +
      'ngaysinh = "' + req.body.ngaysinh + '", ' +
      'tinchi = "' + req.body.tinchi + '" ' +
      'WHERE mssv = "' + req.body.mssv + '";';

  console.log('query = ' + query);

  connection.query(query, function (err, result) {
    if (err) {
      res.end('Failed');
    }
    console.log(result);
  });

  res.end('Complete');
});

module.exports = router;
