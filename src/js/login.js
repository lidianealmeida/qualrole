$(document).ready(function () {

  $(function () {
    $('#login-form-link').click(function (e) {
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
    });

  });

  $('#register-submit').click(createUser);
  $('#login-submit').click(login);
  $('#button-logout').click(logout);

  function createUser(e) {
    e.preventDefault();

    let newUserName = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();
    let newUserConfirmPass = $('#confirm-password').val();

    if (password === newUserConfirmPass) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(function (cred) {
          let userId = cred.user.uid;
          db.collection('user').doc(userId).set({
            name: newUserName,
            email: email,
          }).then(function () {
            window.location = 'feed.html?id=' + userId;
          })
        })
        .catch(function (error) {
          let errorMessage = error.message;
          if (errorMessage == 'auth/weak-password') {
            bootbox.alert('Erro: a senha é muito fraca.');
          } else {
            bootbox.alert(`Erro: ${errorMessage}`);
          }
        })
    } else {
      bootbox.alert('Senhas digitadas não correspondem entre si. Digite novamente.');
    }
  }

  function login(e) {
    e.preventDefault();

    let email = $('#login-email').val();
    let password = $('#login-password').val();

    auth.signInWithEmailAndPassword(email, password)
      .then(function (cred) {
        let userId = cred.user.uid;
        window.location = 'feed.html?id=' + userId;
      })
      .catch(function (error) {
        let errorMessage = error.message;
        bootbox.alert(`Erro: ${errorMessage}`);
      })
      $('.register-submit').submit(function () {
      if ($('.login-password').val() == null || $('.login-submit').val() == "") {
        bootbox.alert('Campos Obrigatórios.');
        return false;
      }
    });
  }

  $('#authGoogleButton').click(function (event) {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    signIn(provider);
  });

  $('#authFacebookButton').click(function (event) {
    event.preventDefault();
    const provider = new firebase.auth.FacebookAuthProvider();
    signIn(provider);
  });

  function signIn(provider) {
    auth.signInWithPopup(provider)
      .then(function (response) {
        let token = response.credential.accessToken;
        let user = response.user;
        window.location = 'feed.html?id=' + user.uid;
      }).catch(function (error) {
        bootbox.alert('Falha na autenticação');
      });
 }

  function logout() {
    auth.signOut()
      .then(function () {
        window.location = 'index.html?id=';
      })
  }

});

