const toggleSignIn = () => {
  console.log((toggleSignIn))
  const provider = new firebase.auth.GoogleAuthProvider();
  const signIn = () => firebase.auth().signInWithPopup(provider);
  const signOut = () => firebase.auth().signOut();

  let user = firebase.auth().currentUser;

  if (user) {
    signOut();
    } else {
      signIn()
    }
}

const initApp = () => {
  console.log("InItApp Function")

  const config = {
    apiKey: "AIzaSyAuCEccB9sMQ7umHvz240yim3eiea9RKcI",
    authDomain: "oauth-tutorial-25fc7.firebaseapp.com",
  };

  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(user => {
    console.log(user)
    if (user) {
      $('#account-info').text(`${user.displayName} is logged in.`);
      $('#account-info').attr('data-name', user.displayName);
      $('#sign-in-container').addClass('hidden');
      $('#sign-out').removeClass('hidden');
      $('#m').attr('disabled', false);
    } else {
      $('#m').val('');
      $('#account-info').text('Sign in to chat!')
      $('#sign-out').addClass('hidden');
      $('#sign-in-container').removeClass('hidden');
      $('#m').attr('disabled', true);
      $('#send-message').attr('disabled', true);
    }
  });
};



$(document).ready(() => initApp())
