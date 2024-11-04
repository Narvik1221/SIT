// Строки для преобразования
let text1 = "Нарчук Андрей";
let text2 = "29.09.2003";

// Функция для преобразования строки в 16-ричный код
function toHex(str) {
  return Array.from(str)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

// Функция для преобразования 16-ричного кода в двоичный
function hexToBinary(hex) {
  return hex
    .split("")
    .map((h) => parseInt(h, 16).toString(2).padStart(4, "0"))
    .join("");
}

// Преобразование текстов в 16-ричный и затем в двоичный код
let hexText1 = toHex(text1);
let binaryText1 = hexToBinary(hexText1);
let hexText2 = toHex(text2);
let binaryText2 = hexToBinary(hexText2);

console.log("Hex of 'Нарчук Андрей':", hexText1);
console.log("Binary of 'Нарчук Андрей':", binaryText1);
console.log("Hex of '29.09.2003':", hexText2);
console.log("Binary of '29.09.2003':", binaryText2);
