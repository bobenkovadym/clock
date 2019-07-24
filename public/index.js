document.addEventListener('DOMContentLoaded', () => {
  let el = document.getElementById('clock');
  let errorEl = document.getElementsByClassName('error')[0];
  setInterval(() => {
    return makeRequest('/time', true)
      .then(time => {
        el.innerHTML = time;
        let cl = errorEl.classList;
        if (cl.contains('show')) {
          cl.remove('show');
        }
      })
      .catch(e => {
        console.log(e.message);
        let cl = errorEl.classList;
        if (!cl.contains('show')) {
          cl.add('show');
        }
      });
  }, 1000);
});

function makeRequest (url, useFetch) {
  return useFetch
    ? fetch(url)
        .then(response => {
          return response.text();
        })
    : new Promise((resolve, reject) => {
        console.log('using XMLHttpRequest');
        try {
          // 1. Создаём новый объект XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
          xhr.open('GET', url, false);

          // 3. Отсылаем запрос
          xhr.send();

          // 4. Если код ответа сервера не 200, то это ошибка
          if (xhr.status != 200) {
            // обработать ошибку
            console.log(xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
            reject();
          } else {
            resolve(xhr.responseText);
          }
        } catch (e) {
          return reject(e);
        }
    });
}
