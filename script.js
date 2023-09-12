let taskList = [];

const entryElm = document.getElementById('entry');
const badElm = document.getElementById('bad');
const badHrElm = document.getElementById('badHr');
const totalHrElm = document.getElementById('totalHr');
const ttlHrPerWeek = 24 * 7;

// get the form data on the button click

const handleOnSubmit = (form) => {
  const newTask = new FormData(form);
  const obj = {
    id: randomStr(),

    task: newTask.get('task'),
    hr: +newTask.get('hr'),
    type: 'entry',
  };

  const ttlHrs = total();

  if (ttlHrs + obj.hr > ttlHrPerWeek) {
    return alert('Sorry boss not enough hours let in a week.');
  }
  console.log(ttlHrs);

  //add to the global array
  taskList.push(obj);
  displayEntryTask();
};

// create the function that takes the array, loop through it and create html and push to the dom

const displayEntryTask = () => {
  let str = ` `;

  const entryListOnly = taskList.filter((item) => item.type === 'entry');

  entryListOnly.map((item, i) => {
    str += `
    <tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.hr}hr</td>
<td class="text-end">
  <button 
  onclick="deleteTask('${item.id}')"
  class="btn btn-danger">
    <i class="fa-solid fa-trash"></i>
  </button>
  <button 
  onclick="switchTask('${item.id}', 'bad')"
  class="btn btn-success">
    <i class="fa-solid fa-arrow-right"></i>
  </button>
</td>
</tr>`;
  });

  entryElm.innerHTML = str;
  total();
};

const displayBadTask = () => {
  let str = ` `;

  const badListOnly = taskList.filter((item) => item.type === 'bad');

  badListOnly.map((item, i) => {
    str += `
    <tr>
<td>${i + 1}</td>
<td>${item.task}</td>
<td>${item.hr}hr</td>
<td class="text-end">

<button 
onclick="switchTask('${item.id}', 'entry')"
class="btn btn-warning">
  <i class="fa-solid fa-arrow-left"></i>
</button>
  <button 
  onclick="deleteTask('${item.id}')"
  class="btn btn-danger cursor:pointer">
    <i class="fa-solid fa-trash"></i>
  </button>
 
</td>
</tr>`;
  });

  const ttlBadHr = badListOnly.reduce((acc, item) => acc + item.hr, 0);
  badHrElm.innerText = ttlBadHr;
  badElm.innerHTML = str;
};

const randomStr = () => {
  const charLength = 6;
  const str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  let id = '';

  for (let i = 0; i < charLength; i++) {
    const randNum = Math.round(Math.random() * (str.length - 1));

    id += str[randNum];
  }
  return id;
};

const switchTask = (id, type) => {
  taskList = taskList.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        type,
      };
    }
    return item;
  });

  displayEntryTask();
  displayBadTask();
  total();
};

// const deleteTask = (id) => {
//   taskList = taskList.filter((item) => {
//     if (item.id === id) {
//       return false;
//     }
//     return true;
//   });
//   displayEntryTask();
//   displayBadTask;
// };

// OR

const deleteTask = (id) => {
  if (window.confirm('Are you sure you want to delete?')) {
    taskList = taskList.filter((item) => item.id !== id);
    displayEntryTask();
    displayBadTask;
  }
};

const total = () => {
  const ttl = taskList.reduce((acc, item) => acc + item.hr, 0);

  totalHrElm.innerText = ttl;
  return ttl;
};
