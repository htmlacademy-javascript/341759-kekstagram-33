//Функция для проверки длины строки.
const stringLength = (string, maxStringLength) => string.length <= maxStringLength;

// Строка короче 20 символов
stringLength('проверяемая строка', 20); // true
// // Длина строки ровно 18 символов
stringLength('проверяемая строка', 18); // true
// // Строка длиннее 10 символов
stringLength('проверяемая строка', 10); // false

//Функция для проверки, является ли строка палиндромом.
const palindrome = function (string) {
  const correctedString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = correctedString.length - 1; i >= 0; i--) {
    newString += correctedString[i];
  }

  return correctedString === newString;
};

// Строка является палиндромом
palindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
palindrome('ДовОд'); // true
// Это не палиндром
palindrome('Кекс'); // false
// Это палиндром
palindrome('Лёша на полке клопа нашёл '); // true

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const stringNumber = function(string) {
  let result = '';
  const correctedString = string.replaceAll(' ', '').toLowerCase();
  for (let i = 0; i <= correctedString.length - 1; i++) {
    if (Number(correctedString[i]) === +correctedString[i]) {
      result += correctedString[i];
    }
  }
  return parseInt(result, 10);
};


stringNumber('2023 год'); // 2023
stringNumber('ECMAScript 2022'); // 2022
stringNumber('1 кефир, 0.5 батона'); // 105
stringNumber('агент 007'); // 7
stringNumber('а я томат'); // NaN


// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.

const conversionNumberMinuts = (world) => {
  const conversionNumber = world.split(':');
  return parseInt(conversionNumber[0], 10) * 60 + parseInt(conversionNumber[1], 10);
};

const workingTime = (startWorking, endWorking, startMeeting, timeMeeting) => {
  if (conversionNumberMinuts(startWorking) <= conversionNumberMinuts(startMeeting)) {
    const meeting = (conversionNumberMinuts(endWorking) - conversionNumberMinuts(startMeeting));
    if (meeting >= timeMeeting){
      return true;
    }
  }
  return false;
};

workingTime('08:00', '17:30', '14:00', 90); // true
workingTime('8:0', '10:0', '8:0', 120); // true
workingTime('08:00', '14:30', '14:00', 90); // false
workingTime('14:00', '17:30', '08:0', 90); // false
workingTime('8:00', '17:30', '08:00', 900); // false
