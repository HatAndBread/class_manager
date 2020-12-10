import * as alertify from 'alertifyjs';

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('ajax:success', (e) => {
  if (e.detail[0].username) {
    let message = '';
    e.detail[0].username.forEach((el) => {
      message += `Username ${el}\n`;
    });
    alertify.alert(message);
  }
});
// alertify.alert('Did you know that you are stupid?');
