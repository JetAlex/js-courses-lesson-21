/*
### Задача 3

Создайте функцию `send` которая будет оберткой для функции `get` которая поддерживает только `callback` технологию.

**Обратите внимание**:

1. Функция `send` **ДОЛЖНА БЫТЬ** промисом.
2. Использование `async & await` **ЗАПРЕЩЕНО**.
3. Использование посторонних библиотек кроме библиотеки `fetch` **ЗАПРЕЩЕНО**
4. Если сервер ответил статус кодом `200` промис **ДОЛЖЕН** резолвится с параметром, аргументом для которого будет массив который содержит список объектов-стран.
5. В том случае если сервер ответил статус кодом не `200` промис **ДОЛЖЕН** реджектится с текстом `We have error, status code: ${statusCode}`

**До рефакторинга**:

```javascript
const get = require('fetch').fetchUrl;

const url = 'https://lab.lectrum.io/geo/api/countries?size=2';
get(url, (error, meta, body) => {
	const { data } = JSON.parse(body);
	console.log(data);
});
```

**После рефакторинга**

```javascript
const get = require('fetch').fetchUrl;
const url = 'https://lab.lectrum.io/geo/api/countries?size=2';

send(url)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
```

 */

const get = require('fetch').fetchUrl;
const url = 'https://lab.lectrum.io/geo/api/countries?size=2';

const send = (url) => new Promise(function(resolve, reject) {
  get(url, (error, meta, body) => {

    if (meta.status === 200) {
      const { data } = JSON.parse(body);
      resolve(data)
    }
    if (error) {
      reject(error)
    }
  });
})

send(url)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
