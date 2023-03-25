const readXlsxFile = require('read-excel-file/node');
const bcrypt = require('bcryptjs');
const Account = require('../model/Account');
const New = require('../model/New');
const User = require('../model/User');

class MainController {
  // [GET] /home
  home(req, res) {
    if (req.session.isAuth) {
      New.find((err, data) => {
        if (!err) {
          res.render('home', { data: data, username: req.session.username });
          console.log(data);
        } else {
          res.status(400).json({ error: 'ERROR!!!' });
        }
      }).lean();
    } else {
      req.session.back = '/home';
      res.redirect('/login/');
    }
  }

  // [PUT] /chitiettintuc/:id
  chitiettintuc(req, res, next) {
    if (req.session.isAuth) {
      New.find((err, listNew) => {
        if (!err) {
          New.findOne({ idNew: Number(req.params.idNew) }, (err, data) => {
            if (!err) {
              res.render('chitiettintuc', {
                data: data,
                listNew: listNew,
                username: req.session.username,
              });
            } else {
              res.status(400).json({ error: 'ERROR!!!' });
            }
          }).lean();
        } else {
          res.status(400).json({ error: 'ERROR!!!' });
        }
      }).lean();
    } else {
      req.session.back = '/home';
      res.redirect('/login/');
    }
  }

  // [GET] /register
  register(req, res) {
    res.render('register');
  }

  // [GET] /register
  thongtincanhanTV(req, res) {
    res.render('thongtincanhantv');
  }

  // [GET] /register
  listchatcvtv(req, res) {
    res.render('listchatcvtv');
  }

  // [GET] /home
  loginql(req, res) {
    res.render('login');
  }

  // [GET] /login
  login(req, res) {
    Account.findOne(
      // { tendangnhap: req.body.tendangnhap, matkhau: req.body.matkhau },
      { username: req.body.username },

      function (err, user) {
        if (!err) {
          if (user == null) {
            req.flash('error', 'Tên đăng nhập không đúng!');
            res.redirect('/login/');
          } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              var sess = req.session; //initialize session variable
              sess.isAuth = true;
              sess.role = user.role;
              sess.username = user.username;
              if (sess.back) {
                res.redirect(sess.back);
              } else {
                res.render('home', { username: req.session.username });
              }
            } else {
              req.flash('error', 'Mật khẩu không đúng!');
              res.redirect('/login/');
            }
          }
        } else {
          res.status(400).json({ error: 'ERROR!!!' });
        }
      }
    );
  }
}
module.exports = new MainController();
