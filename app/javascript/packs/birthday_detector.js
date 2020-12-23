const toI = (num) => {
  return parseInt(num, 10);
};

const addZero = (num) => {
  if (toI(num) < 10) {
    return `0${num}`;
  }
  return num;
};

const birthdayDetector = (student) => {
  const studentBirthday = student.birthday.match(/\d\d-\d\d$/g)[0];
  console.log(student.birthday);
  for (let i = -20; i < 20; i++) {
    const futureDay = new Date(Date.now() + 1000 * 60 * 60 * 24 * i);
    const month = addZero(futureDay.getMonth() + 1);
    const day = addZero(futureDay.getDate());
    const futureDayDate = `${month}-${day}`;
    if (studentBirthday === futureDayDate) {
      return true;
    }
  }
  return false;
};

export default birthdayDetector;
