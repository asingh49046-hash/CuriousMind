import {
  db,
  collection,
  getDocs
} from './firebase.js';

const container =
document.getElementById('questionContainer');

const questionCount =
document.getElementById('questionCount');

const searchInput =
document.getElementById('searchInput');

/* LOAD QUESTIONS */

async function loadQuestions(){

  const querySnapshot =
  await getDocs(collection(db,'questions'));

  container.innerHTML='';

  let total = 0;

  querySnapshot.forEach((doc)=>{

    total++;

    const data = doc.data();

    container.innerHTML += `

      <div class="card">

        <h3>
          ${data.question}
        </h3>

        <p>
          ${data.answer}
        </p>

      </div>

    `;

  });

  questionCount.innerText = total;

}

loadQuestions();

/* SEARCH */

searchInput.addEventListener('keyup',()=>{

  const value =
  searchInput.value.toLowerCase();

  const cards =
  document.querySelectorAll('.card');

  cards.forEach(card=>{

    const text =
    card.innerText.toLowerCase();

    if(text.includes(value)){

      card.style.display='block';

    }else{

      card.style.display='none';

    }

  });

});