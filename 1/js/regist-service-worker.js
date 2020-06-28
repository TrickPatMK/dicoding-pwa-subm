// REGISTER SERVICE WORKER
if("serviceWorker" in navigator){
   window.addEventListener("load", () => {
       navigator.serviceWorker.register("../service-worker.js")
       .then(() => {
           console.log("Pendaftaran ServiceWorker Berhasil!");
       })
       .catch(() => {
           console.log("Pendaftaran ServiceWorker Gagal!");
       });
   });
} else {
   console.log("ServiceWorker belum didukung browser ini!");
}