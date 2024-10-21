function addParityBit(packet) {
  let parityBit = packet.reduce((acc, bit) => acc ^ bit, 0); // XOR для четности
  packet.push(parityBit); // Добавляем бит четности
  return packet;
}
function hexToBinary(hex) {
  return parseInt(hex, 16).toString(2).padStart(8, "0").split("").map(Number); // Преобразование hex в двоичный
}
// Исходное сообщение
let fioHex = [
  "C0",
  "CD",
  "C4",
  "D0",
  "C5",
  "C9",
  "CD",
  "C0",
  "D0",
  "D7",
  "D3",
  "CA",
];
let dateHex = ["32", "39", "2E", "30", "39", "2E", "32", "30", "30", "33"];
let messageBinary = fioHex.concat(dateHex).flatMap(hexToBinary);
// Дополнение нулями до кратности 16 бит
while (messageBinary.length % 16 !== 0) {
  messageBinary.push(0);
}
// Разделение на пакеты по 16 бит
let packets = [];
for (let i = 0; i < messageBinary.length; i += 16) {
  let packet = messageBinary.slice(i, i + 16);
  packets.push(addParityBit(packet)); // Добавляем бит четности
}
console.log("Пакеты с битом четности:");
console.log(packets);
// Моделирование передачи (инверсия случайных битов)
function introduceNoise(packet, Q) {
  return packet.map((bit) => (Math.random() < Q ? 1 - bit : bit)); // Инверсия битов
}
let Q = 0.1; // Вероятность помех
let transmittedPackets = packets.map((packet) => introduceNoise(packet, Q));
console.log("Пакеты после передачи:");
console.log(transmittedPackets);
// Проверка пакетов
let validPackets = transmittedPackets.filter((packet) => {
  let dataBits = packet.slice(0, -1);
  let parityBit = packet[packet.length - 1];
  return dataBits.reduce((acc, bit) => acc ^ bit, 0) === parityBit;
});
console.log(
  `Количество верных пакетов: ${validPackets.length} из ${packets.length}`
);
let redundancy = 1 / (16 + 1); // Избыточность = 1 / (i + k), где i = 16 бит, k = 1 бит
console.log(`Избыточность: ${redundancy}`);
