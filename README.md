# О проекте

Учебный fullstack проект тикет-системы для сервиса по ремонту электроники. Создан на основе Udemy-курса "React Front To Back" от Brad Traversy.

# Функциональность

Проект состоит из frontend и backend части. Фронтенд реализован только для пользователя. Приложение позволяет зарегистрированному пользователю:
- создавать тикет с выбором устройства и описанием возникшей проблемы;
- просматривать список своих тикетов и их статус;
- в каждом тикете можно вести переписку с сотрудником службы поддержки, создавая/получая сообщения;

Предусмотрены функции регистрации, аутентификации/авторизации.

# Стек

React, React Router, Redux Toolkit, Node.js(Express), MongoDB(Mongoose)

# Запуск

Для редактирования и запуска проекта необходимо установить Node.js (https://nodejs.org/) и
редактор кода, например VSCode (https://code.visualstudio.com/):

-   Клонируйте репозиторий или загрузите zip-файл;
-   Установите зависимости для всего проекта командой npm i;
-   В консоли перейдите в папку /frontend и установите зависимости командой npm i для frontend части приложения;
-   Запустите проект командой npm run dev, приложение запуститься по адресу http://localhost:3000/

# Планы по доработке

Реализовать frontend часть для сотрудника службы поддержки.