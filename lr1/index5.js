function hammingEncode(dataBits) {
  let n = dataBits.length;
  let parityCount = 0;
  // Определение количества контрольных битов
  while (1 << parityCount < n + parityCount + 1) {
    parityCount++;
  }
  let encodedBits = [];
  let parityPositions = [];
  let j = 0;
  for (let i = 1; i <= n + parityCount; i++) {
    if ((i & (i - 1)) === 0) {
      encodedBits.push(0);
      parityPositions.push(i - 1);
    } else {
      encodedBits.push(dataBits[j]);
      j++;
    }
  }
  // Рассчитываем значения контрольных битов
  for (let p of parityPositions) {
    let parity = 0;
    for (let i = 1; i <= encodedBits.length; i++) {
      if (i & (p + 1)) {
        parity ^= encodedBits[i - 1];
      }
    }
    encodedBits[p] = parity;
  }
  return encodedBits;
}
// Пример кода Хемминга
let dataBits = [1, 0, 1, 1]; // Пример пакета данных
let hammingEncoded = hammingEncode(dataBits);
console.log("Закодированное сообщение с кодом Хемминга:");
console.log(hammingEncoded);
// Реализация кода Бергера
function bergerEncode(dataBits) {
  let numOnes = dataBits.filter((bit) => bit === 1).length;
  let bergerCode = numOnes
    .toString(2)
    .padStart(dataBits.length, "0")
    .split("")
    .map(Number);
  return dataBits.concat(bergerCode);
}
let bergerEncoded = bergerEncode(dataBits);
console.log("Закодированное сообщение с кодом Бергера:");
console.log(bergerEncoded);

// Процесс передачи аналогичен, моделируем помехи и проверяем на ошибки
