// Создаем worker (указатель)
const worker = new Worker("worker.js");

// Регистрируем worker
if (navigator.serviceWorker.controller) {
  console.log('Service worker уже установлен, повторная регистрация не нужна!')
} else {
  // указываем файл SW и область его действия (scope)
  navigator.serviceWorker.register('./serviceworker.js', {
    scope: '.'
  }).then(function(reg) {
	// Регистрация прошла успешно
    console.log('Service worker успешно зарегистирирован для области действия: '+ reg.scope);
  });
}

// Отправка сообщения
function sendMessageToWorker() {
  worker.postMessage("hello");
}

// Отправка сообщения
function askWorkerRecurringTask() {
  worker.postMessage("recurring");
}

// Обработка сообщений, полученных от worker-a
// Значение сообщений помещается в messageEvent.data
worker.addEventListener("message", function(messageEvent) {
  const log = document.createElement("p");
  log.textContent = messageEvent.data;
  // Выводим в документ
  document.querySelector("output").prepend(log);
});

