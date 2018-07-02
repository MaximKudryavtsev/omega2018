npm install - установить все зависимости

npm run built - собрать проект

npm run start - запустить проект

данные бд - https://github.com/MaximKudryavtsev/omega2018/blob/master/src/config/DBConfig.ts

Структура таблиц в бд:

users

    id_user(integer, primary_key, not null)
    name(varchar(255), not null)
    email(varchar(255), not null)
  
history

    id_history(integer, primary_key, not null)
    id_user(integer, mot null) references users(id_user)
    createdAt(date, not null)
    updatedAt(date, not null)
    state(varchar(50), not null)
