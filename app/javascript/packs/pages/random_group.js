import birthdayDetector from '../birthday_detector';
import randumb from 'no-duplicates';
import * as alertify from 'alertifyjs';

const token = document.getElementsByName('csrf-token')[0].content;

let currentClass = null;
let randomizedClass = null;
let numberOfGroupsToMake = null;
let groupHolder = [];
const butt = document.querySelector('button');
const select = document.querySelector('#class-select');
const numberSelect = document.querySelector('#student-number-select');
const groupDisplay = document.getElementById('group-display');
console.log(groupDisplay);

const createNumberSelect = () => {
  numberOfGroupsToMake = null;
  numberSelect.innerHTML = '';
  numberSelect.insertAdjacentHTML(
    'beforeend',
    `<option value="" disabled selected hidden>Minimum number of students per group</option>`
  );
  let min;
  currentClass.length / 2 < 4 ? (min = 3) : (min = currentClass.length / 2);
  for (let i = 1; i < min; i++) {
    numberSelect.insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
  }
};
numberSelect.addEventListener('change', (e) => {
  numberOfGroupsToMake = Math.floor(currentClass.length / e.target.value);
  console.log(numberOfGroupsToMake);
});

const getStudents = async (id) => {
  const res = await fetch('/my_students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify({ id: id })
  });
  const data = await res.json();
  const studentBin = [];
  data.students.forEach((student) => {
    if (birthdayDetector(student)) {
      student.birthdaySoon = true;
    }
    studentBin.push(student);
  });
  currentClass = studentBin;
  createNumberSelect();
};

select.addEventListener('change', (e) => {
  e.target.value ? getStudents(e.target.value) : null;
});

const createGroupDiv = (group) => {
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  group.forEach((student) => {
    const text = document.createTextNode(`${student.first_name} ${student.last_name}`);
    const li = document.createElement('li');
    li.appendChild(text);
    if (student.birthdaySoon) {
      const span = document.createElement('span');
      const cake = document.createTextNode('🎂');
      span.addEventListener('click', () => {
        alertify.notify(`🎂${student.birthday}`, 'success', 3);
      });
      span.appendChild(cake);
      span.className = 'b-day-span';
      li.appendChild(span);
    }
    ul.appendChild(li);
  });
  div.appendChild(ul);
  return div;
};

const insertGroups = () => {
  groupDisplay.innerHTML = '';
  groupHolder.forEach((group) => {
    groupDisplay.appendChild(createGroupDiv(group));
  });
};

const makeGroups = () => {
  groupHolder = [];
  while (randomizedClass.length > 0) {
    if (numberSelect.value <= randomizedClass.length) {
      console.log();
      groupHolder.push(randomizedClass.splice(0, numberSelect.value));
    } else {
      let num = randomizedClass.length;
      for (let i = 0; i < num; i++) {
        if (groupHolder[i]) {
          groupHolder[i].push(randomizedClass.splice(0, 1)[0]);
        } else {
          groupHolder[num - i - 1].push(randomizedClass.splice(0, 1)[0]);
        }
      }
    }
  }
  insertGroups();
};

butt.addEventListener('click', () => {
  if (!currentClass) {
    alertify.alert('Please select a class');
  } else if (!numberOfGroupsToMake) {
    alertify.alert('Please choose minimum number of students per group.');
  } else {
    randomizedClass = randumb(currentClass)(true);
    makeGroups();
  }
});
