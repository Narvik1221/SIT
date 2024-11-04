// Исходные данные
const originalBits = "1101000010";

// Таблица 4B/5B кодирования
const table4B5B = {
  "0000": "11110",
  "0001": "01001",
  "0010": "10100",
  "0011": "10101",
  "0100": "01010",
  "0101": "01011",
  "0110": "01110",
  "0111": "01111",
  1000: "10010",
  1001: "10011",
  1010: "10110",
  1011: "10111",
  1100: "11010",
  1101: "11011",
  1110: "11100",
  1111: "11101",
};

// Разбиение исходного сообщения на блоки по 4 бита и кодирование в 5-битные блоки
function encode4B5B(bits) {
  let encodedBits = "";
  for (let i = 0; i < bits.length; i += 4) {
    let fourBits = bits.slice(i, i + 4);
    encodedBits += table4B5B[fourBits] || ""; // Кодируем каждый блок
  }
  return encodedBits;
}

const encodedMessage = encode4B5B(originalBits);
console.log("Сообщение после 4B/5B кодирования:", encodedMessage);

// Пересчет характеристик

// Параметры канала
const C = 1000000; // Пропускная способность канала, 1 Мбит/с
const f0 = C / 2; // Основная гармоническая частота (максимальная частота)

// Определение нижней частоты fn
// Ищем самую длинную последовательность одинаковых битов в закодированном сообщении
let maxLength = 1;
let currentLength = 1;
for (let i = 1; i < encodedMessage.length; i++) {
  if (encodedMessage[i] === encodedMessage[i - 1]) {
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
let highFreqCount = encodedMessage.split("1").length - 1; // количество единиц (высокочастотных компонентов)
let lowFreqCount = encodedMessage.length - highFreqCount;

const f_avg = (highFreqCount * f0 + lowFreqCount * fn) / encodedMessage.length;

// Полоса пропускания (для стабильной передачи чуть больше ширины спектра)
const F = S + 100000; // Немного больше ширины спектра для стабильности

// Вывод результатов
console.log("Нижняя частота (fn):", fn, "Гц");
console.log("Максимальная частота (fv):", fv, "Гц");
console.log("Ширина спектра (S):", S, "Гц");
console.log("Средняя частота (f_avg):", f_avg.toFixed(2), "Гц");
console.log("Полоса пропускания (F):", F, "Гц");
