// Первые 10 бит
const bits = [1, 1, 0, 1, 0, 0, 0, 0, 1, 0];

// Создание сигналов для разных кодировок
const nrzSignal = bits.map((bit) => (bit ? 1 : -1));
const rzSignal = bits.flatMap((bit) => (bit ? [1, 0] : [0, 0]));
let amiLevel = 1;
const amiSignal = bits.map((bit) => {
  if (bit) {
    const level = amiLevel;
    amiLevel = -amiLevel;
    return level;
  }
  return 0;
});

// Создание графиков с использованием Chart.js
function createChart(ctx, label, data) {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from({ length: data.length }, (_, i) => i + 1),
      datasets: [
        {
          label: label,
          data: data,
          borderColor: "blue",
          borderWidth: 2,
          stepped: true,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          min: -1.5,
          max: 1.5,
          beginAtZero: false,
        },
        x: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Создание графиков NRZ, RZ и AMI
createChart(document.getElementById("nrzChart"), "NRZ Encoding", nrzSignal);
createChart(document.getElementById("rzChart"), "RZ Encoding", rzSignal);
createChart(document.getElementById("amiChart"), "AMI Encoding", amiSignal);

//3.3
// Параметры канала
const C = 1000000; // Пропускная способность канала, 1 Мбит/с
const f0 = C / 2; // Основная гармоническая частота (максимальная частота)

// Определение нижней частоты fn
// Ищем самую длинную последовательность из нулей или единиц
let maxLength = 1;
let currentLength = 1;
for (let i = 1; i < bits.length; i++) {
  if (bits[i] === bits[i - 1]) {
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
// Для упрощения возьмем:
let highFreqCount = bits.filter(
  (bit, index) => bit === 1 && bits[index + 1] !== bit
).length; // кол-во переходов 1-0
let lowFreqCount = bits.length - highFreqCount;

const f_avg = (highFreqCount * f0 + lowFreqCount * fn) / bits.length;

// Полоса пропускания (для стабильной передачи чуть больше ширины спектра)
const F = S + 100000; // Немного больше ширины спектра для стабильности

// Вывод результатов
console.log("Нижняя частота (fn):", fn, "Гц");
console.log("Максимальная частота (fv):", fv, "Гц");
console.log("Ширина спектра (S):", S, "Гц");
console.log("Средняя частота (f_avg):", f_avg.toFixed(2), "Гц");
console.log("Полоса пропускания (F):", F, "Гц");
