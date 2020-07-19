const webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BCwMILN5g1nFl3NkqiecEV0gtXWjQVn68TKqVvWeOZmg4Z2arsYQv86Lq0x71KNWu567ouGdjBtG2SsAK915YJo",
   "privateKey": "TzN-hM-F-M6rBq7X3TC8QtKVX-8zHV8_uGaKMRTlAMo"
};

webPush.setVapidDetails(
   'maito:example@yourdomain.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/f_Nc9tAMjIY:APA91bHZq6jnDk5S5beqnBBMyTOXijl-fRJLXS05c3-eb4cY13Oj9PsP-FUxrExiVvFKF0Kfnp7hM-Vpx_v7kd-m7RWj38pU3ZdDyC-SswpHDNyTnO7JPLQwnrve1me1XhpF6dTYmpW5",
   "keys": {
      "p256dh": "BC9EYEWgA0eFrxCkqQvXBUACvK7uzWaEUBMACaN9mkL2HnVOEDji1mx0ESOE6165msjSm/bqKDt0CmOkiOxc/KE=",
      "auth": "yUwVbF2suzjuJaQkZAH3ww=="
   }
};

let payload = 'Ini adalah sebuah pesan notifikasi.';

const options = {
   gcmAPIKey: '864756267782',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
)