import {
  db,
  collection,
  addDoc
} from './firebase.js';

const form = document.getElementById('questionForm');

const popup = document.getElementById('successPopup');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const question = document.getElementById('question').value;

  const answer = document.getElementById('answer').value;

  const category = document.getElementById('category').value;

  const username = document.getElementById('username').value;

  const tags = document.getElementById('tags').value;

  try {

    await addDoc(collection(db, 'questions'), {

      question,
      answer,
      category,
      username,
      tags,
      createdAt: new Date()

    });

    popup.style.display = 'flex';

    form.reset();

  } catch(error){

    alert(error.message);

  }

});

window.closePopup = function(){

  popup.style.display = 'none';

}