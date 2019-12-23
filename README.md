# Search query 

- [Search query](#search-query)
    - [Установка](#%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0)
    - [Подключенние](#подключенние)
    - [Примеры использования](#%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80%d1%8b-%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8f)
    - [Доступные методы поиска](#%d0%94%d0%be%d1%81%d1%82%d1%83%d0%bf%d0%bd%d1%8b%d0%b5-%d0%bc%d0%b5%d1%82%d0%be%d0%b4%d1%8b-%d0%bf%d0%be%d0%b8%d1%81%d0%ba%d0%b0)
    - [Дополнения](#%d0%94%d0%be%d0%bf%d0%be%d0%bb%d0%bd%d0%b5%d0%bd%d0%b8%d1%8f)

### Установка

```bash
git clone https://github.com/thex49/search_query.git

yarn install
```

Вам потребуется создать папку plugins если ее нет, и перекинуть папку туда.

### Подключенние 
```js
const Discord = require('discord.js');
const client = new Discord.Client();

const module = require('./plugins/search_query/index.js');
module.inject(client);
/*
* Теперь плагин доступен в client.query
* Нахождение плагина так же можно измен
* ить если передать второй аргумент
*/
module.inject(client, 'search');
// Плагин доступен в client.search
```

### Примеры использования 

```js

let member = client.query.findMember(message, 'Nefelit');
member.user.tag; // Nefelit#5800
``` 

```js

let member = client.query.findMember(message, 'NefelitChange');
member.user.tag; // Nefelit#5800
``` 
![image](http://i.imgur.com/gEK8VTk.png)

![imageSecond](http://i.imgur.com/ZU8ER4V.png)


### Доступные методы поиска

* `findUser`    - поиск пользователя
* `findMember`  - поиск участника
* `findGuild`   - поиск сервера на сервере
* `findCommand` - поиск команды в боте
* `findRole`    - поиск роли на сервере
* `findChannel` - поиск канала на сервере
* `inject`      - вшивка в клиент, метод будет удален после первого использования

### Дополнения

* `findCommand` может принимать второй аргумент в качестве `true` или `false`
* `inject` может принимать второй аргумент в качестве специального путя в `client`
```js
client.findCommand('evaluate');

// OUTPUT
/*
{
  name: 'eval',
  execute: [AsyncFunction: execute],
  module: 'dev',
  ownerOnly: true
}
*/

client.findCommand('evaluate', true);
// OUTPUT
/*
{ target: 'eval', rating: 0.8 }
*/
```
