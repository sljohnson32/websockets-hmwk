const toggleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const signIn = () => firebase.auth().signInWithPopup(provider);
  const signOut = () => firebase.auth().signOut();

  let user = firebase.auth().currentUser;

  if (user) {
    signOut()
    console.log('SIGN OUT')
    } else {
      signIn()
      console.log('SIGN IN')
    }
}

const initApp = () => {

  const config = {
    apiKey: "AIzaSyAuCEccB9sMQ7umHvz240yim3eiea9RKcI",
    authDomain: "oauth-tutorial-25fc7.firebaseapp.com",
  };

  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      $('#account-info').text(`${user.displayName} is logged in.`);
      $('#sign-in-container').toggleClass('hidden');
      $('#sign-out').toggleClass('hidden');
    } else {
      $('#account-info').text('Sign in to chat!')
      $('#sign-out').toggleClass('hidden');
      $('#sign-in-container').toggleClass('hidden');
    }
  });
};

$('.sign-in-out').on('click', toggleSignIn);

window.onload = () => {
  initApp();
};
