import * as alertify from 'alertifyjs';

const token = document.getElementsByName('csrf-token')[0].content;

const birthdays = document.querySelectorAll('.td-birthday');
birthdays.forEach((birthday) => {
  birthday.addEventListener('click', (e) => {
    console.log('You clicked on a birthday!');
  });
});

const data = {};

const tableBody = document.querySelector('tbody');
const trs = tableBody.querySelectorAll('tr');
trs.forEach((tr) => {
  if (tr.id) {
    const tds = tr.querySelectorAll('td');
    data[tr.id.toString()] = { id: tr.id };
    tds.forEach((td) => {
      switch (td.className) {
        case 'td-first_name':
          data[tr.id.toString()].first_name = td.firstChild.value;
          td.addEventListener('input', (e) => {
            data[tr.id.toString()].first_name = e.target.value;
            console.log(data);
          });
          break;
        case 'td-last_name':
          data[tr.id.toString()].last_name = td.firstChild.value;
          td.addEventListener('input', (e) => {
            data[tr.id.toString()].last_name = e.target.value;
            console.log(data);
          });
          break;
        case 'td-birthday':
          data[tr.id.toString()].birthday = td.firstChild.value;
          td.addEventListener('input', (e) => {
            data[tr.id.toString()].birthday = e.target.value;
            console.log(data);
          });
          break;
        case 'trash':
          console.log(td);
          td.addEventListener('click', () => {
            alertify.confirm(
              'Are you sure you want to delete this student?',
              function () {
                //delete from db
              },
              function () {}
            );
          });
          break;
        default:
          console.log('this is not');
      }
    });
  }
});

const form = document.querySelector('form');

const saveButt = document.getElementById('save-butt');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/my_classes/24', {
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
  } else {
    alertify.notify('There was an error saving to the database. Please try again', 'failure', 3, function () {
      console.log('dismissed');
    });
  }
});
