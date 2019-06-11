/*
### Задача 2

Создайте функцию `getCustomers` которая умеет правильно склеивать 2 массива с объектами.

Операция склеивания происходит по ключу `id` и только для объектов у которых установлен флаг `verified: true`.

**Обратите внимание**:

1. Функция `getCustomers` **ДОЛЖНА БЫТЬ** промисом.
2. Использование `async & await` **ЗАПРЕЩЕНО**.
3. Использование посторонних библиотек **ЗАПРЕЩЕНО**
4. В том случае если в массиве `countries` отстутсвует необходимый `id` промис **ДОЛЖЕН** реджектится с текстом `We don't have information about country for this customer: ${customer.name}`
5. Склеивание происходит **ТОЛЬКО** для объектов с флагом `verified: true`.

**Пример использования**:

```javascript
const customers = [
    {
        id: 'A1',
        name: 'Oliver',
        verified: true
    },
    {
        id: 'A2',
        name: 'alex'
    }
];

const countries = [
    {
        id: 'A1',
        country: 'usa'
    },
    {
        id: 'A2',
        country: 'poland'
    }
];

getCustomers(customers, countries)
    .then((customers) => console.log(customers))
    .catch(error => console.log(error))
```

 */
const getCustomers = (customers, countries) => new Promise(function (resolve, reject) {

  let newCustomers = [];

  for (const customer of customers) {
    if (!customer.verified) {
      continue;
    }

    const id = customer.id;
    const match = countries.find((el) => el.id === id);
    const country = match && match.country;
    if (!match ||  !country) {
      reject(`We don't have information about country for this customer: ${customer.name}`);
    }

    newCustomers.push(Object.assign(customer, {country}))
  }

  resolve(newCustomers);
});

const customers = [
  {
    id: 'A1',
    name: 'Oliver',
    verified: true
  },
  {
    id: 'A2',
    name: 'alex'
  }
];

const countries = [
  {
    id: 'A1',
    country: 'usa'
  },
  {
    id: 'A2',
    country: 'poland'
  }
];

getCustomers(customers, countries)
  .then((customers) => console.log(customers))
  .catch(error => console.log(error))
