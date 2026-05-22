import {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from './firebase.js';

/* AUTO REDIRECT */

onAuthStateChanged(auth, (user) => {

  if(user){

    window.location.href = 'admin.html';

  }

});

const form = document.getElementById('loginForm');

const loader = document.getElementById('loader');

/* LOGIN */

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  loader.style.display = 'flex';

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    loader.style.display = 'none';

    alert('Login Successful');

    window.location.href = 'admin.html';

  } catch(error){

    loader.style.display = 'none';

    alert(error.message);

  }

});

/* FORGOT PASSWORD */

document.getElementById('forgotPassword')
.addEventListener('click', async () => {

  const email = document.getElementById('email').value;

  if(!email){

    alert('Enter your email first');

    return;

  }

  try{

    await sendPasswordResetEmail(auth, email);

    alert('Password reset email sent');

  } catch(error){

    alert(error.message);

  }

});