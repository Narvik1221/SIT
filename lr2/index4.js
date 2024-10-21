let COMPLETED = false;
let RE_SYNC = false;
let LINE = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Передатчик с длинными последовательностями
async function CODE1() {
  let MESS = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // Длинная последовательность единиц
  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit (long sequence): ${MESS[i]}`);
    LINE = MESS[i] + 1;
    await sleep(100);
  }
  LINE = 0;
}

async function main() {
  CODE1();
  await sleep(5000);
  COMPLETED = true;
}

main();
