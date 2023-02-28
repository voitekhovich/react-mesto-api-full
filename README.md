# Проект «[Место](https://mesto.voitekhovich.nomoredomains.icu/)» (frontend + backend)

Учебный проект [Яндекс.Практикум](https://practicum.yandex.ru/) по курсу "Интерфейсы с использованием React" и "Основы бэкенда для фронтенд-разработчиков".\
Сервис Mesto: интерактивная страница, куда можно добавлять фотографии, удалять их, ставить лайки и редактировать профиль.

https://user-images.githubusercontent.com/30049720/221412047-47975354-4a56-4716-a226-a94c87c353bc.mp4

## 🕹 Функционал

* Регистрация и авторизация пользователей
* Загрузка информации о пользователе с сервера
* Загрузка карточек с сервера
* Редактирование профиля
* Добавление новой карточки
* Отображение количества лайков карточки
* Удаление карточки
* Постановка и снятие лайка
* Обновление аватара пользователя

## 🙄 Используемые технологии

* Node.js
* MongoDB
* React

## 📺 Посмотреть вживую
https://mesto.voitekhovich.nomoredomains.icu/

## 🛠 Запуск локально

**Зависимости:**
* Node.js - 16.18.0
* MongoDB - 4.4.x

```
git clone https://github.com/voitekhovich/react-mesto-api-full.git
cd react-mesto-api-full/
```

**Backend:**
```
cd ./backend/
npm i
npm run start
```

**Frontend:**
```
cd ./frontend/
npm i
echo PORT=3001 > .env
npm run start
```

## 🛠 Запуск на сервере

**Зависимости:**
* Node.js - 16.18.0
* MongoDB - 4.4.x
* PM2
* Nginx

```
git clone https://github.com/voitekhovich/react-mesto-api-full.git

echo PORT=3000 >> ~/react-mesto-api-full/backend/.env
echo JWT_SECRET=[YOUR_SECRET] >> ~/react-mesto-api-full/backend/.env
echo JWT_EXPIRESIN=7d >> ~/react-mesto-api-full/backend/.env

echo PORT=3001 >> ~/react-mesto-api-full/frontend/.env
echo REACT_APP_BASE_URL='https://[YOUR_BACKEND_URL]' >> ~/react-mesto-api-full/frontend/.env

cd ~/react-mesto-api-full/backend
npm i
pm2 start mesto

cd ~/react-mesto-api-full/frontend
npm i
npm run build
chmod +x ~/react-mesto-api-full/frontend/build/
```
Настройка nginx `/etc/nginx/sites-available/default`
```
server {
      listen 80;
      server_name [YOUR_BACKEND_DOMAIN];
      location / {
                proxy_pass http://localhost:3001;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
      }
}
server {
      listen 80;
      server_name [YOUR_FRONT_DOMAIN];
      root /home/alex/react-mesto-api-full/frontend/build;
      location / {
                try_files $uri $uri/ /index.html;
      }
}
```
