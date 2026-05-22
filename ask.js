import {
  db,
  collection,
  addDoc
} from './firebase.js';

const requestForm =
document.getElementById('requestForm');

requestForm.addEventListener(
'submit',
async (e)=>{

  e.preventDefault();

  const question =
  document.getElementById('question').value;

  const name =
  document.getElementById('name').value;

  const email =
  document.getElementById('email').value;

  try{

    await addDoc(
      collection(db,'requests'),
      {

        question,
        name,
        email,
        createdAt:new Date()

      }
    );

    alert(
      'Request Submitted Successfully'
    );

    requestForm.reset();

  }catch(error){

    alert(error.message);

  }

});