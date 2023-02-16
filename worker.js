// Обработка сообщений, отправленных worker-у
// Значение сообщений помещается в messageEvent.data

self.addEventListener("message", function(messageEvent) {
  // Получено сообщение - hello
  if (messageEvent.data === "hello") {
    // Отправляем сообщение обратно в основной скрипт
    self.postMessage("И вам не болеть!");
  }

  // Получено сообщение - рекурсивная задача
  if (messageEvent.data === "recurring") {
	// Отправляем сообщения обратоно в основной скрипт - текущее время
    for (let i = 0; i < 10; i++) {
      setTimeout(() => self.postMessage(new Date()), i * 1000);
    }
  }
});
