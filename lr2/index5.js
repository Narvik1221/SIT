let COMPLETED = false;
let RE_SYNC = false;
let LINE = 0;
let RECEIVED = []; // Массив для принятого сообщения

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Передатчик
async function CODE1() {
  let MESS = [1, 0, 0, 1, 1, 0, 1, 0];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit: ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(100);
  }
  LINE = 0;
}

// Приемник
async function DECODE() {
  while (!COMPLETED) {
    if (LINE === 2) {
      RECEIVED.push(1);
      console.log("GotBit: 1");
    } else if (LINE === 1) {
      RECEIVED.push(0);
      console.log("GotBit: 0");
    }
    await sleep(100);
  }
}

// Поток NOISE
async function NOISE() {
  while (!COMPLETED) {
    if (Math.random() < 0.1) {
      // 10% шанс внести помеху
      LINE = Math.floor(Math.random() * 3); // Случайное значение для внесения помех
      console.log("NOISE introduced");
    }
    await sleep(50);
  }
}

// Сравнение отправленного и полученного
async function compareResults(sentMessage) {
  if (JSON.stringify(sentMessage) === JSON.stringify(RECEIVED)) {
    console.log("Message received successfully");
  } else {
    console.log("Message received with errors");
  }
}

async function main() {
  let MESS = [1, 0, 0, 1, 1, 0, 1, 0]; // Исходное сообщение
  NOISE(); // Запуск потока с помехами
  DECODE(); // Запуск декодирования
  await CODE1(); // Запуск передатчика

  await sleep(2000); // Время на завершение передачи и прием
  COMPLETED = true;

  await compareResults(MESS); // Сравнение результатов
}

main();
