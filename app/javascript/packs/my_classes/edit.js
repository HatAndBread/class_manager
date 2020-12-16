import * as alertify from 'alertifyjs';

const token = document.getElementsByName('csrf-token')[0].content;

const pathname = window.location.pathname.match(/\/my_classes\/\d+\//)[0];

const data = {};

const addStudentButt = document.getElementById('add-student-butt');
const form = document.querySelector('form');
const tableBody = document.querySelector('tbody');
const trs = tableBody.querySelectorAll('tr');

const deleteStudent = async (studentId) => {
  console.log(`deleting student with id ${studentId}`);
  const res = await fetch(`/students/${studentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify({ id: studentId })
  });
  const parsed = await res.json();
  delete data[parsed.id];
  console.log(data);
  const tr = document.getElementById(parsed.id.toString());
  tableBody.removeChild(tr);
};

const sorter = (tr, newStudent) => {
  const tds = tr.querySelectorAll('td');
  if (newStudent) {
    data[tr.id] = { id: null };
  } else {
    data[tr.id] = { id: tr.id };
  }
  tds.forEach((td) => {
    switch (td.className) {
      case 'td-first_name':
        data[tr.id].first_name = td.firstChild.value;
        td.addEventListener('input', (e) => {
          data[tr.id].first_name = e.target.value;
          console.log(data);
        });
        break;
      case 'td-last_name':
        data[tr.id].last_name = td.firstChild.value;
        td.addEventListener('input', (e) => {
          data[tr.id].last_name = e.target.value;
          console.log(data);
        });
        break;
      case 'td-birthday':
        td.firstChild.value ? (data[tr.id].birthday = td.firstChild.value) : (data[tr.id].birthday = '');
        td.addEventListener('input', (e) => {
          data[tr.id].birthday = e.target.value;
          console.log(data);
        });
        break;
      case 'trash':
        td.addEventListener('click', () => {
          if (parseInt(tr.id)) {
            alertify.confirm(
              'Are you sure you want to delete this student?',
              function () {
                //delete from db
                deleteStudent(tr.id);
              },
              function () {
                console.log('delete cancelled');
              }
            );
          } else {
            delete data[tr.id];
            console.log(data);
            tableBody.removeChild(tr);
          }
        });
        break;
      default:
        console.log('this is not');
    }
  });
};

trs.forEach((tr) => {
  if (tr.id) {
    sorter(tr);
  }
});

const removeTemporary = () => {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (!parseInt(key, 10)) {
      delete data[key];
    }
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch(pathname, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token
    },
    body: JSON.stringify({ data: data })
  });
  if (res.ok) {
    alertify.notify('Changes successfully saved', 'success', 3, function () {
      console.log('dismissed');
    });
    const parsed = await res.json();
    console.log(parsed.students);
    tableBody.innerHTML = '';
    parsed.students.forEach((student) => {
      tableBody.insertAdjacentHTML(
        `beforeend`,
        `<tr id="${student.id}">
        <td class="td-first_name"><input type="text" name="first_name" value="${student.first_name}" required/></td>
        <td class="td-last_name"><input type="text" name="last_name" value="${student.last_name}" required/></td>
        <td class="td-birthday"><input type="date" name="birthday" value="${student.birthday}"/></td>
        <td class="trash"><i class="fa fa-trash"></i></td>
        <tr>`
      );
      const tr = document.getElementById(student.id);
      sorter(tr);
    });
    removeTemporary();
    console.log('DATA', data);
  } else {
    alertify.notify('There was an error saving to the database. Please try again', 'failure', 3, function () {
      console.log('dismissed');
    });
  }
});

addStudentButt.addEventListener('click', () => {
  const myId = Math.random();
  data[myId] = { id: null };
  console.log(data);
  tableBody.insertAdjacentHTML(
    'beforeend',
    `<tr id="${myId}">
        <td class="td-first_name"><input type="text" name="first_name" required/></td>
        <td class="td-last_name"><input type="text" name="last_name" required/></td>
        <td class="td-birthday"><input type="date" name="birthday" /></td>
        <td class="trash"><i class="fa fa-trash"></i></td>
        <tr>`
  );
  const tr = document.getElementById(myId);
  sorter(tr, true);
});
