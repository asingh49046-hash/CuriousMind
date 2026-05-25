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
   QUILL EDITOR
========================= */

const quill = new Quill(
  '#editor',
  {
    theme:'snow',

    modules:{
      toolbar:'#toolbar'
    }
  }
);

/* =========================
   ADMIN PROTECTION
========================= */

onAuthStateChanged(auth, (user)=>{

  if(user){

    loadAdminQuestions();

    loadRequests();

  }else{

    window.location.href='login.html';

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

const requestContainer =
document.getElementById('requestContainer');

/* =========================
   LOAD QUESTIONS
========================= */

async function loadAdminQuestions(){

  try{

    const querySnapshot =
    await getDocs(
      collection(db,'questions')
    );

    adminContainer.innerHTML='';

    querySnapshot.forEach((item)=>{

      const data = item.data();

      adminContainer.innerHTML += `

        <div class="admin-card">

          <h3>
            ${data.question}
          </h3>

          <div class="rich-answer">
            ${data.answer}
          </div>

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
                \`${data.username || ''}\`
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

  }catch(error){

    alert(error.message);

  }

}

/* =========================
   ADD QUESTION
========================= */

adminQuestionForm.addEventListener(
'submit',
async (e)=>{

  e.preventDefault();

  const question =
  document.getElementById('question')
  .value
  .trim();

  const answer =
  quill.root.innerHTML.trim();

  if(answer === '<p><br></p>'){

    alert('Please write answer');

    return;

  }

  const category =
  document.getElementById('category')
  .value;

  const username =
  document.getElementById('username')
  .value;

  try{

    await addDoc(
      collection(db,'questions'),
      {

        question,
        answer,
        category,
        username,
        createdAt:new Date()

      }
    );

    alert(
      'Question Published Successfully'
    );

    adminQuestionForm.reset();

    quill.root.innerHTML='';

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
    'Delete this question?'
  );

  if(confirmDelete){

    try{

      await deleteDoc(
        doc(db,'questions',id)
      );

      alert(
        'Question Deleted'
      );

      loadAdminQuestions();

    }catch(error){

      alert(error.message);

    }

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
  username
)=>{

  editPopup.style.display='flex';

  document.getElementById('editId')
  .value=id;

  document.getElementById('editQuestion')
  .value=question;

  document.getElementById('editAnswer')
  .value=answer;

  document.getElementById('editCategory')
  .value=category;

  document.getElementById('editUsername')
  .value=username;

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
  document.getElementById('editId')
  .value;

  try{

    await updateDoc(
      doc(db,'questions',id),
      {

        question:
        document.getElementById('editQuestion')
        .value,

        answer:
        document.getElementById('editAnswer')
        .value,

        category:
        document.getElementById('editCategory')
        .value,

        username:
        document.getElementById('editUsername')
        .value

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
   LOAD USER REQUESTS
========================= */

async function loadRequests(){

  try{

    const querySnapshot =
    await getDocs(
      collection(db,'requests')
    );

    requestContainer.innerHTML='';

    querySnapshot.forEach((item)=>{

      const data = item.data();

      requestContainer.innerHTML += `

        <div class="request-card">

          <h3>
            ❓ ${data.question}
          </h3>

          <p>
            👤 ${data.name}
          </p>

          <p>
            📧 ${data.email}
          </p>

          <button
            class="request-delete-btn"
            onclick="deleteRequest('${item.id}')"
          >
            🗑 Delete Request
          </button>

        </div>

      `;

    });

  }catch(error){

    alert(error.message);

  }

}

/* =========================
   DELETE USER REQUEST
========================= */

window.deleteRequest =
async (id)=>{

  const confirmDelete =
  confirm(
    'Delete this request?'
  );

  if(confirmDelete){

    try{

      await deleteDoc(
        doc(db,'requests',id)
      );

      alert(
        'Request Deleted Successfully'
      );

      loadRequests();

    }catch(error){

      alert(error.message);

    }

  }

}

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