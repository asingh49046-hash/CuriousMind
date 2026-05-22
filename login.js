import {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from './firebase.js';

const form =
document.getElementById('loginForm');

/* LOGIN */

form.addEventListener(
'submit',
async (e)=>{

  e.preventDefault();

  const email =
  document.getElementById('email').value;

  const password =
  document.getElementById('password').value;

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert('Login Successful');

    window.location.href =
    'admin.html';

  }catch(error){

    alert(error.message);

  }

});

/* FORGOT PASSWORD */

document.getElementById('forgotPassword')
.addEventListener(
'click',
async ()=>{

  const email =
  document.getElementById('email').value;

  if(!email){

    alert('Enter email first');

    return;

  }

  try{

    await sendPasswordResetEmail(
      auth,
      email
    );

    alert(
      'Password reset email sent'
    );

  }catch(error){

    alert(error.message);

  }

});
/* PASSWORD TOGGLE */

const togglePassword =
document.getElementById('togglePassword');

const password =
document.getElementById('password');

togglePassword.addEventListener(
'click',
()=>{

  if(password.type==='password'){

    password.type='text';

    togglePassword.innerHTML='🙈';

  }else{

    password.type='password';

    togglePassword.innerHTML='👁';

  }

});