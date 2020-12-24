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
  if (student.birthday) {
    const studentBirthday = student.birthday.match(/\d\d-\d\d$/g)[0];
    for (let i = -8; i < 8; i++) {
      const futureDay = new Date(Date.now() + 1000 * 60 * 60 * 24 * i);
      const month = addZero(futureDay.getMonth() + 1);
      const day = addZero(futureDay.getDate());
      const futureDayDate = `${month}-${day}`;
      if (studentBirthday === futureDayDate) {
        return true;
      }
    }
  }
  return false;
};

export default birthdayDetector;
