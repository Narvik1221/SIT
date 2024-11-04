let COMPLETED = false;
let RE_SYNC = false;
let LINE = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
let MESS_3_4 = [
  1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
  0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0,
  0, 1, 0, 0, 0, 1, 1, 1,
]; //проверка рассинхронизации при длинном сообщении
// Ускоренная передача CODE1
async function CODE1() {
  let MESS = [1, 0, 0, 1, 0, 0, 0, 1, 1, 1];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (CODE1): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(50); // Ускорение передачи
  }
  LINE = 0;
}

// Ускоренная передача CODE2
async function CODE2() {
  let MESS = [1, 1, 0, 0, 1, 1, 0, 0];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (CODE2): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(100); // Ускорение передачи
  }
  LINE = 0;
}

// Ускоренная передача CODE3
async function CODE3() {
  let MESS = [0, 1, 1, 0, 1, 0, 1, 0];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (CODE3): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(150); // Ускорение передачи
  }
  LINE = 0;
}

async function main() {
  CODE1();
  await sleep(750); // Задержка между сообщениями
  CODE2();
  await sleep(750); // Задержка между сообщениями
  CODE3();
  await sleep(5000); // Увеличиваем общее время сеанса
  COMPLETED = true;
}

main();
