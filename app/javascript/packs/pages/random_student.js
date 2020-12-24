import birthdayDetector from '../birthday_detector';
import randumb from 'no-duplicates';
import * as alertify from 'alertifyjs';

let randomStudent = null;
let currentStudent = null;
const studentNameSpan = document.querySelector('#student-name-span');
const bDaySpan = document.querySelector('.b-day-span');
const butt = document.querySelector('button');
const token = document.getElementsByName('csrf-token')[0].content;
const select = document.querySelector('select');

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
  randomStudent = randumb(studentBin);
  window.randomStudent = randomStudent;
};

select.addEventListener('change', (e) => {
  e.target.value ? getStudents(e.target.value) : null;
});

butt.addEventListener('click', () => {
  if (typeof randomStudent === 'function') {
    currentStudent = randomStudent();
    currentStudent.birthdaySoon ? (bDaySpan.innerText = ' 🥳🎂') : (bDaySpan.innerText = '');
    studentNameSpan.innerText = `${currentStudent.first_name} ${currentStudent.last_name}`;
  } else {
    alert('Please select a class');
  }
});

bDaySpan.addEventListener('click', () => {
  console.log(currentStudent.birthday);
  alertify.notify(`🎂${currentStudent.birthday}`, 'success', 3, function () {
    console.log('dismissed');
  });
});
