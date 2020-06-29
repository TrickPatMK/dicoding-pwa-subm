const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "",
   "privateKey": ""
};

webPush.setVapidDetails(
   'maito:example@yourdomain.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "",
   "keys": {
      "p256dh": "",
      "auth": ""
   }
};

let payload = 'Ini adalah sebuah pesan notifikasi.';

const options = {
   gcmAPIKey: '',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
)