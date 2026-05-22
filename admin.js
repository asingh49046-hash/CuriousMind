import {
  db,
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  auth,
  onAuthStateChanged,
  signOut
} from './firebase.js';

/* =========================
   ADMIN PROTECTION
========================= */

onAuthStateChanged(auth, (user) => {

  if(user){

    loadAdminQuestions();

  }else{

    window.location.href = 'login.html';

  }

});

/* =========================
   ELEMENTS
========================= */

const adminContainer =
document.getElementById('adminContainer');

const adminSearch =
document.getElementById('adminSearch');

const adminQuestionForm =
document.getElementById('adminQuestionForm');

const editPopup =
document.getElementById('editPopup');

const editForm =
document.getElementById('editForm');

/* =========================
   LOAD QUESTIONS
========================= */

async function loadAdminQuestions(){

  const querySnapshot =
  await getDocs(collection(db,'questions'));

  adminContainer.innerHTML = '';

  querySnapshot.forEach((item)=>{

    const data = item.data();

    adminContainer.innerHTML += `

      <div class="admin-card">

        <h3>
          ${data.question}
        </h3>

        <p>
          ${data.answer}
        </p>

        <div class="admin-meta">

          <span class="category-badge">
            ${data.category}
          </span>

          <small>
            👤 ${data.username || 'Admin'}
          </small>

        </div>

        <div class="action-buttons">

          <button
            class="edit-btn"
            onclick="editQuestion(
              '${item.id}',
              \`${data.question}\`,
              \`${data.answer}\`,
              \`${data.category}\`,
              \`${data.username || ''}\`,
              \`${data.tags || ''}\`
            )"
          >
            ✏️ Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteQuestion('${item.id}')"
          >
            🗑 Delete
          </button>

        </div>

      </div>

    `;

  });

}

/* =========================
   ADD QUESTION
========================= */

adminQuestionForm.addEventListener(
'submit',
async (e)=>{

  e.preventDefault();

  const question =
  document.getElementById('question').value;

  const answer =
  document.getElementById('answer').value;

  const category =
  document.getElementById('category').value;

  const username =
  document.getElementById('username').value;

  const tags =
  document.getElementById('tags').value;

  try{

    await addDoc(
      collection(db,'questions'),
      {

        question,
        answer,
        category,
        username,
        tags,
        createdAt:new Date()

      }
    );

    alert(
      'Question Published Successfully'
    );

    adminQuestionForm.reset();

    loadAdminQuestions();

  }catch(error){

    alert(error.message);

  }

});

/* =========================
   DELETE QUESTION
========================= */

window.deleteQuestion =
async (id)=>{

  const confirmDelete =
  confirm(
    'Are you sure you want to delete this question?'
  );

  if(confirmDelete){

    await deleteDoc(
      doc(db,'questions',id)
    );

    loadAdminQuestions();

  }

}

/* =========================
   SEARCH QUESTIONS
========================= */

adminSearch.addEventListener(
'keyup',
()=>{

  const value =
  adminSearch.value.toLowerCase();

  const cards =
  document.querySelectorAll('.admin-card');

  cards.forEach((card)=>{

    const text =
    card.innerText.toLowerCase();

    if(text.includes(value)){

      card.style.display='block';

    }else{

      card.style.display='none';

    }

  });

});

/* =========================
   OPEN EDIT POPUP
========================= */

window.editQuestion = (
  id,
  question,
  answer,
  category,
  username,
  tags
)=>{

  editPopup.style.display='flex';

  document.getElementById('editId').value=id;

  document.getElementById('editQuestion').value=question;

  document.getElementById('editAnswer').value=answer;

  document.getElementById('editCategory').value=category;

  document.getElementById('editUsername').value=username;

  document.getElementById('editTags').value=tags;

}

/* =========================
   CLOSE EDIT POPUP
========================= */

window.closeEditPopup = ()=>{

  editPopup.style.display='none';

}

/* =========================
   SAVE EDIT
========================= */

editForm.addEventListener(
'submit',
async (e)=>{

  e.preventDefault();

  const id =
  document.getElementById('editId').value;

  try{

    await updateDoc(
      doc(db,'questions',id),
      {

        question:
        document.getElementById('editQuestion').value,

        answer:
        document.getElementById('editAnswer').value,

        category:
        document.getElementById('editCategory').value,

        username:
        document.getElementById('editUsername').value,

        tags:
        document.getElementById('editTags').value

      }
    );

    alert(
      'Question Updated Successfully'
    );

    closeEditPopup();

    loadAdminQuestions();

  }catch(error){

    alert(error.message);

  }

});

/* =========================
   LOGOUT
========================= */

document.getElementById('logoutBtn')
.addEventListener(
'click',
async ()=>{

  await signOut(auth);

  window.location.href='login.html';

});