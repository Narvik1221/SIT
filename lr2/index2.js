let COMPLETED = false;
let RE_SYNC = false;
let LINE = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Передатчик CODE1
async function CODE1() {
  let MESS = [1, 0, 0, 1, 0, 0, 0, 1, 1, 1];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (CODE1): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(100);
  }
  LINE = 0;
}

// Передатчик CODE2
async function CODE2() {
  let MESS = [1, 1, 0, 0, 1, 1, 0, 0];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (CODE2): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(200);
  }
  LINE = 0;
}

// Передатчик CODE3
async function CODE3() {
  let MESS = [0, 1, 1, 0, 1, 0, 1, 0];
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (CODE3): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(300);
  }
  LINE = 0;
}

async function main() {
  CODE1();
  await sleep(1500); // Задержка между сообщениями
  CODE2();
  await sleep(1500); // Задержка между сообщениями
  CODE3();
  await sleep(5000); // Увеличиваем общее время сеанса
  COMPLETED = true;
}

main();
