/*
### Задача 4

Создайте класс `Countries` который при создании своего экземпляра принимает один параметр в с типом строка. Этот параметр будет служить API эндпоинтом.

У класса `Countries` должен быть один метод `send` который должен возвращать промис.

А принимает метод `send` один параметр который должен быть по типу `number` и который потом будет использоватся как значение для `GET` параметра `size`.

**Обратите внимание**:

1. Метод `send` **ДОЛЖЕН БЫТЬ** промисом.
2. Использование `async & await` внутри класса **ЗАПРЕЩЕНО**.
3. Использование посторонних библиотек кроме библиотеки `fetch` **ЗАПРЕЩЕНО**
4. Если сервер ответил статус кодом `200` промис **ДОЛЖЕН** возвращать массив который содержит список объектов-стран.
5. В том случае если сервер ответил статус кодом не `200` промис **ДОЛЖЕН** генерировать ошибку с текстом `We have error, status code: ${statusCode}`
6. Генерировать ошибку если `url` по типу не строка.
7. Генерировать ошибку если методу `send` передать по типу не число.

**В результате такой код должен работать**:

```javascript
const get = require('fetch').fetchUrl;

const url = 'https://lab.lectrum.io/geo/api/countries';
const countries = new Countries(url);

(async() => {
    try {
        const data = await countries.send(2);
        console.log(data); // массив стран
    } catch (error) {
        console.log(error);
    }
})();
```
 */

class Countries {
  constructor(url) {
    if (typeof url !== 'string') {
      throw new Error('URL parameter is not a string');
    }
    this.url = url;
  }

  send(num) {
    if (typeof num !== 'number') {
      throw new Error('num parameter is not a number');
    }

    return new Promise((resolve, reject) => {
      const url = `${this.url}?size=${num}`;
      get(url, (error, meta, body) => {
        const statusCode = meta.status;
        if ( statusCode === 200) {
          const { data } = JSON.parse(body);
          resolve(data)
        } else {
          reject(`We have error, status code: ${statusCode}`)
        }
      });
    })
  }
}

const get = require('fetch').fetchUrl;

const url = 'https://lab.lectrum.io/geo/api/countries';
const countries = new Countries(url);

(async() => {
  try {
    const data = await countries.send(2);
    console.log(data); // массив стран
  } catch (error) {
    console.log(error);
  }
})();
