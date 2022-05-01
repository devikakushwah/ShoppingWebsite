const User = require('../model/user.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { getEmail } = require('../model/user.model');
exports.registerPage = (request, response) => {
  const name = request.body.name;
  const mobile = request.body.mobile;
  const email = request.body.email;
  const password = request.body.password;
  const hashedPassword = "";
  var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '/' + mm + '/' + dd;

  bcrypt.genSalt(10, (err, Salt) => {
    bcrypt.hash(password, Salt, (err, hash) => {
      if (err) {
        return console.log('Cannot encrypt');
      }
      else {
        console.log(hash);

        const user = new User(email, hash, name, mobile);
        user.save()
          .then(result => {
            const email = request.body.email;
               console.log(result);
               var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'devikakushwah29@gmail.com',
                  pass: 'Database@29'
                }
              });
            
              var mailOptions = {
                from: 'devikakushwah29@gmail.com',
                to: email,
                subject: 'checking ',
                text: 'devika sending email for project!'
              };
            
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  response.redirect("/user/login");
                  console.log('Email sent: ' + info.response);
                }
              });
            response.redirect("/");
          })
          .catch(err => {
            response.send("not success");
          });
      }

    });
  });
}
exports.loginPost = (request, response) => {
  let email = request.body.email;

  let password = request.body.password;
  const user = new User(email, password);
  user.checkUser()
    .then(results => {
      request.session.current_user_id = results[0].id;

      response.redirect("/");
    })
    .catch(err => {
      response.send("incorrect password");
    })

}
exports.forgotPassword = (request, response) => {
  var email = request.body.email;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devikakushwah29@gmail.com',
      pass: 'Database@29'
    }
  });

  var mailOptions = {
    from: 'devikakushwah29@gmail.com',
    to: email,
    subject: 'checking ',
    text: 'devika sending email for project!'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      response.redirect("/user/login");
      console.log('Email sent: ' + info.response);
    }
  });
}
exports.loginPage = (request, response, next) => {

  response.render("./user/login.ejs");

}
exports.logout = (request, response, next) => {
  request.session.current_user_id = null;
  request.session.destroy();
  response.redirect("/");

}
exports.createAccountPage = (request, response) => {
  response.render("./user/create_account.ejs");
}
