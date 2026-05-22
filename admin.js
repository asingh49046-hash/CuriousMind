import {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  auth,
  onAuthStateChanged,
  signOut
} from './firebase.js';

const adminContainer = document.getElementById('adminContainer');

const totalQuestions = document.getElementById('totalQuestions');

const adminSearch = document.getElementById('adminSearch');

/* LOAD QUESTIONS */

async function loadAdminQuestions() {

  const querySnapshot = await getDocs(collection(db, 'questions'));

  adminContainer.innerHTML = '';

  let count = 0;

  querySnapshot.forEach((item) => {

    count++;

    const data = item.data();

    adminContainer.innerHTML += `

      <div class="admin-card">

        <h3>${data.question}</h3>

        <p>${data.answer}</p>

        <div class="admin-meta">

          <span class="category-badge">
            ${data.category}
          </span>

          <small>
            👤 ${data.username || 'Anonymous'}
          </small>

        </div>

        <button
          class="delete-btn"
          onclick="deleteQuestion('${item.id}')"
        >
          Delete Question
        </button>

      </div>

    `;

  });

  totalQuestions.innerText = count;

}

loadAdminQuestions();

/* DELETE */

window.deleteQuestion = async (id) => {

  const confirmDelete = confirm(
    'Are you sure you want to delete this question?'
  );

  if(confirmDelete){

    await deleteDoc(doc(db, 'questions', id));

    loadAdminQuestions();

  }

}

/* SEARCH */

adminSearch.addEventListener('keyup', () => {

  const value = adminSearch.value.toLowerCase();

  const cards = document.querySelectorAll('.admin-card');

  cards.forEach(card => {

    const text = card.innerText.toLowerCase();

    if(text.includes(value)){

      card.style.display = 'block';

    } else {

      card.style.display = 'none';

    }

  });

});

/* LOGOUT */

document.getElementById('logoutBtn')
.addEventListener('click', () => {

  auth.signOut();

  window.location.href = 'login.html';

});