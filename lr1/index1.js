// Функция для вычисления контрольного бита по модулю 2
function calculateParityBit(bits) {
  let parityBit = 0;
  for (let bit of bits) {
    parityBit ^= bit; // Сложение по модулю 2 (XOR)
  }
  return parityBit;
}

// Функция для моделирования помехи с вероятностью Q
function introduceNoise(bits, Q) {
  return bits.map((bit) => (Math.random() < Q ? 1 - bit : bit)); // Инвертируем бит с вероятностью Q
}

// Функция для проверки правильности передачи
function checkMessage(bits) {
  let parityBit = calculateParityBit(bits);
  return parityBit === 0;
}

// Моделирование передачи сообщения с одной и двумя ошибками
function simulateTransmission(bits, Q) {
  let parityBit = calculateParityBit(bits);
  bits.push(parityBit); // Добавляем контрольный бит к исходным

  console.log(
    `Изначальная последовательность (с контрольным битом): ${bits.join("")}`
  );

  let noisyBits = introduceNoise(bits, Q); // Моделируем помеху
  console.log(
    `Последовательность после передачи (с помехами): ${noisyBits.join("")}`
  );

  let isMessageValid = checkMessage(noisyBits);
  console.log(
    `Результат проверки правильности передачи: ${
      isMessageValid ? "Нет ошибок" : "Ошибка обнаружена"
    }`
  );
}

// Исходная последовательность 4 бита
let originalBits = [1, 0, 1, 1]; // Пример

// Вероятность инверсии бита (Q)
let Q = 0.2; // Вероятность 20%

// Запуск симуляции
simulateTransmission(originalBits, Q);

// Теперь моделируем передачу с 2 ошибками
Q = 0.5; // Увеличиваем вероятность до 50% для двух ошибок
simulateTransmission(originalBits, Q);
