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
// Пакеты по 8 бит
let packets8 = splitIntoPackets(messageBinary, 8);
console.log("Пакеты по 8 бит с битом четности:", packets8);
// Пакеты по 4 бита
let packets4 = splitIntoPackets(messageBinary, 4);
console.log("Пакеты по 4 бита с битом четности:", packets4);
// Моделирование передачи и сравнение
let Q = 0.1; // Вероятность помех
let transmittedPackets8 = packets8.map((packet) => introduceNoise(packet, Q));
let validPackets8 = transmittedPackets8.filter((packet) => {
  let dataBits = packet.slice(0, -1);
  let parityBit = packet[packet.length - 1];
  return dataBits.reduce((acc, bit) => acc ^ bit, 0) === parityBit;
});
console.log(
  `Количество верных пакетов (8 бит): ${validPackets8.length} из ${packets8.length}`
);
let redundancy8 = 1 / (8 + 1);
console.log(`Избыточность (8 бит): ${redundancy8}`);
let transmittedPackets4 = packets4.map((packet) => introduceNoise(packet, Q));
let validPackets4 = transmittedPackets4.filter((packet) => {
  let dataBits = packet.slice(0, -1);
  let parityBit = packet[packet.length - 1];
  return dataBits.reduce((acc, bit) => acc ^ bit, 0) === parityBit;
});
console.log(
  `Количество верных пакетов (4 бита): ${validPackets4.length} из ${packets4.length}`
);
let redundancy4 = 1 / (4 + 1);
console.log(`Избыточность (4 бита): ${redundancy4}`);
function hexToBinary(hex) {
  return parseInt(hex, 16).toString(2).padStart(8, "0").split("").map(Number); // Преобразование hex в двоичный
}
function introduceNoise(bits, Q) {
  return bits.map((bit) => (Math.random() < Q ? 1 - bit : bit)); // Инвертируем бит с вероятностью Q
}
function addParityBit(packet) {
  let parityBit = packet.reduce((acc, bit) => acc ^ bit, 0);
  packet.push(parityBit);
  return packet;
}
function splitIntoPackets(messageBinary, packetSize) {
  let packets = [];
  for (let i = 0; i < messageBinary.length; i += packetSize) {
    let packet = messageBinary.slice(i, i + packetSize);
    while (packet.length < packetSize) {
      packet.push(0); // Дополнение нулями
    }
    packets.push(addParityBit(packet));
  }
  return packets;
}
