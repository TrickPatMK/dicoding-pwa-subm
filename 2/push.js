const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BFkQZYn1LHyStG-u81jtJXSuILEiaNgR7LQXkAZSbbAAttVT4oH3qov2aPk6PgXXbNnL3a3e1talc31kIdD3Y3Q",
   "privateKey": "237aY9FrFBRCdNGlO7Og7vt-yR2PEG-N7xsmo5TJPsY"
};

webPush.setVapidDetails(
   'maito:example@yourdomain.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dF3JFqDxA20:APA91bHF43ombRUDpmnnGz5TJzQsChnthUqOqo6kyXbZsxPDdCQlKDKXf73AkDYAL6aJbRGs13auWhOAVH8j1NTiOcZuwDlLwW8BAR1pmoAJ15Qo6_fI6wVbOu5Rcnqmw8Ffsg1atiGn",
   "keys": {
      "p256dh": "BG28CMV/mEeA1aLH4d5UnzpJXCy8QYwgJPZUC0t26mi2JDvzSnEieNeeo/Zwjf74eMPHXE3EXG+mYkz5YJxEyT8=",
      "auth": "oYEjr6s1y9Ms2kNp8U04VA=="
   }
};

let payload = 'Ini adalah sebuah pesan notifikasi.';

const options = {
   gcmAPIKey: '760328591577',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
)