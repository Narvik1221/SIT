function hexToBinary(hex) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}

// ФИО "Андрей Нарчук"
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
let fioBinary = fioHex.map(hexToBinary);

console.log("ФИО в двоичном коде:");
console.log(fioBinary.join(" "));

// Дата рождения "29.09.2003"
let dateHex = ["32", "39", "2E", "30", "39", "2E", "32", "30", "30", "33"];
let dateBinary = dateHex.map(hexToBinary);

console.log("Дата рождения в двоичном коде:");
console.log(dateBinary.join(" "));
