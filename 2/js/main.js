// REGISTER SERVICE WORKER
if(!("serviceWorker" in navigator)){
   console.log('Service Worker tidak didukung browser ini.');
} else {
   registerServiceWorker();
}

function registerServiceWorker(){
   return navigator.serviceWorker.register("/sw.js")
   .then(registration => {
      console.log('Registrasi Service Worker berhasil!');
      return registration;
   })
   .catch(err => {
      console.error('Registrasi Service Worker gagal', err);
   });
}