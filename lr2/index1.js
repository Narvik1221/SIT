// Глобальные переменные
let COMPLETED = false;
let RE_SYNC = false;
let LINE = 0; // Сигнальная линия: 1 - ноль, 2 - единица

Math.random();

// Функция паузы (Sleep)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Передатчик: кодирование сообщения
async function CODE1() {
  let MESS = [
    1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1,
    0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0,
    0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1,
    0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0,
  ]; // Андрей Нарчук

  for (let i = 0; i < MESS.length; i++) {
    console.log(`Coded bit: ${MESS[i]}`);
    LINE = MESS[i] + 1; // Единичный бит -> амплитуда 2, ноль -> амплитуда 1
    await sleep(100); // Период посылки сигнала (100 мс)
  }

  LINE = 0; // Сигнал завершён
}
// Приемник: декодирование сообщения
async function DECODE() {
  while (!RE_SYNC) {
    await sleep(10); // Ожидание 10 мс между проверками

    if (RE_SYNC) break; // Если синхронизация прервана

    if (LINE === 2) {
      console.log("GotBit: 1"); // Получен бит 1
    } else if (LINE === 1) {
      console.log("GotBit: 0"); // Получен бит 0
    }

    await sleep(10); // Промежуточные паузы, чтобы избежать считывания дублированных данных
  }
}
// Слушатель: синхронизация приема
async function LISTENER() {
  let buf = LINE; // Начальное значение линии

  while (!COMPLETED) {
    let prevBuf = buf; // Сохраняем предыдущее состояние линии
    await sleep(20); // Пауза в 20 мс

    if (Math.abs(prevBuf - LINE) > 0) {
      console.log("SYNCed"); // Зафиксирован перепад сигнала, синхронизация
      RE_SYNC = true;
      await sleep(10); // Пауза для синхронизации
      RE_SYNC = false;
      DECODE(); // Перезапускаем процесс декодирования
    }

    buf = LINE; // Обновляем буфер
  }
}
// Главная программа
async function main() {
  // Запуск слушателя в фоновом режиме
  LISTENER();

  await sleep(315); // Пауза перед запуском передатчика
  CODE1(); // Запуск передатчика

  await sleep(5000); // Время на выполнение передачи
  COMPLETED = true; // Завершение передачи
}

main(); // Вызов основной программы
