# Проект "Сайт с анекдотами"

## Описание проекта
Проект представляет собой веб-приложение для просмотра, добавления и оценки анекдотов. Пользователи могут регистрироваться, входить в систему, просматривать анекдоты, добавлять свои собственные, ставить лайки и просматривать список самых популярных анекдотов. Администраторы могут управлять анекдотами, удаляя подозрительные.

## Технологии

### Frontend
- React
- React Router
- Axios
- React-Bootstrap
- React Toastify

### Backend
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- Flasgger

### Мобильная версия (iOS)
- SwiftUI

## Установка и запуск проекта

### Frontend

1. Скачайте код [Frontend репозиторий](https://github.com/MesseMMP/Summer-school-project-frontend)
2. Установите зависимости:
    ```bash
    npm install
    ```

3. Запустите проект:
    ```bash
    npm start
    ```

### Backend

1. Скачайте код [Backend репозиторий](https://github.com/MesseMMP/Summer-school-project-backend)
2. Установите зависимости:
    ```bash
    pip install Flask SQLAlchemy Flask-JWT-Extended Flasgger
    ```

3. Запустите сервер:
    ```bash
    python app.py
    ```

### iOS приложение

1. Скачайте код [iOS репозиторий](https://github.com/realINL/summer_school_jokes_ios)
2. Откройте проект в Xcode.
3. Соберите и запустите приложение на эмуляторе или устройстве.

## Функциональность

### Регистрация и авторизация
- Пользователи могут зарегистрироваться и войти в систему.
- После успешной регистрации пользователю показывается сообщение "Registration successful!".
- Можно зарегистрироваться как админ, для этого нужно ввести секретную фразу.

### Просмотр и фильтрация анекдотов
- Главная страница отображает список всех анекдотов.
- Пользователи могут фильтровать анекдоты по категориям.
- Есть возможность посмотреть случайный анекдот.

### Добавление анекдотов
- Авторизованные пользователи могут добавлять новые анекдоты.

### Лайки и топ анекдотов
- Авторизованные пользователи могут ставить лайки анекдотам или убирать уже добавленный лайк.
- Доступен список топ 10 анекдотов по количеству лайков.

### Административные функции
- Администраторы могут управлять анекдотами, удалять некорректные или оскорбительные.

### Истечение срока действия токена
- Система проверяет срок действия токена (после входа в систему отводится 15 минут на сессию) и автоматически выходит из системы, если токен истек.
- За 2 минуты до истечения срока система предупреждает о скором завершении сессии.

### Документация API с использованием Swagger
- Проект использует Swagger для автоматической генерации документации API.

#### Как получить доступ к документации Swagger

1. Убедитесь, что сервер Flask запущен:
    ```bash
    python app.py
    ```

2. Откройте в браузере следующий адрес:
    ```
    http://localhost:8008/apidocs
    ```

Здесь вы сможете просмотреть документацию всех доступных API маршрутов и протестировать их.
