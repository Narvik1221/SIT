// Исходное сообщение после 4B/5B кодирования
const encodedMessage = "1101111110";

// Функция скремблирования по правилу 2.10
function scrambler(inputBits) {
  const scrambledBits = [];

  for (let i = 0; i < inputBits.length; i++) {
    let bit = parseInt(inputBits[i]);

    if (i >= 3) {
      bit ^= scrambledBits[i - 3];
    }
    if (i >= 5) {
      bit ^= scrambledBits[i - 5];
    }

    scrambledBits.push(bit);
  }
  return scrambledBits.join("");
}

const scrambledMessage = scrambler(encodedMessage);
console.log("Скремблированное сообщение:", scrambledMessage);

// Параметры канала
const C = 1000000; // Пропускная способность канала, 1 Мбит/с
const f0 = C / 2; // Основная гармоническая частота (максимальная частота)

// Определение нижней частоты fn для скремблированного сообщения
let maxLength = 1;
let currentLength = 1;
for (let i = 1; i < scrambledMessage.length; i++) {
  if (scrambledMessage[i] === scrambledMessage[i - 1]) {
    currentLength++;
    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
  } else {
    currentLength = 1;
  }
}
const fn = C / (maxLength * 2); // Нижняя частота при самой длинной последовательности

// Максимальная частота
const fv = f0; // Определена как основная гармоника, т.е. C/2

// Ширина спектра
const S = fv - fn;

// Расчет средней частоты
let highFreqCount = scrambledMessage.split("1").length - 1; // количество единиц (высокочастотных компонентов)
let lowFreqCount = scrambledMessage.length - highFreqCount;

const f_avg =
  (highFreqCount * f0 + lowFreqCount * fn) / scrambledMessage.length;

// Полоса пропускания (для стабильной передачи чуть больше ширины спектра)
const F = S + 100000; // Немного больше ширины спектра для стабильности

// Вывод результатов
console.log("Нижняя частота (fn):", fn, "Гц");
console.log("Максимальная частота (fv):", fv, "Гц");
console.log("Ширина спектра (S):", S, "Гц");
console.log("Средняя частота (f_avg):", f_avg.toFixed(2), "Гц");
console.log("Полоса пропускания (F):", F, "Гц");
