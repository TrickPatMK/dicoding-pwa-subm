// REGISTER SERVICE WORKER
// i just think this need to separated since main not connected to match page
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

// Config Navigasi
document.addEventListener("DOMContentLoaded", function(){

   // activate sidebar nav
   const elems = document.querySelectorAll(".sidenav");
   M.Sidenav.init(elems);
   loadNav();

   // Load page content
   let page = window.location.hash.substr(1);
   if(page == "") page = "home";
   loadPage(page);

   function loadNav(){
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
         if(this.readyState == 4){
            if(this.status != 200) return;

             // Muat daftar tautan menu
            document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
               elm.innerHTML = xhttp.responseText;
            });

            // Daftarkan event listener pada setiap tautan menu
            document.querySelectorAll(".topnav a, .sidenav a").forEach(elm => {
               elm.addEventListener("click", event => {
                  // Tutup sidenav
                  let sidenav = document.querySelector(".sidenav");
                  M.Sidenav.getInstance(sidenav).close();

                  // Muat konten yang dipanggil
                  page = event.target.getAttribute("href").substr(1);
                  loadPage(page);
               });
            });
         }
      };

      xhttp.open("GET", "pages/nav.html", true);
      xhttp.send();
   }


   function loadPage(page){
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function(){
         if(this.readyState == 4){
            let content = document.querySelector("#body-content");
            if(this.status == 200){
               content.innerHTML = xhttp.responseText;
               if(page === 'home') {
                  matchInfo();
               } else if(page === 'standings'){
                  standingList();
               } 
            } else if(this.status == 404){
               content.innerHTML = `<h3>Halaman Tidak dapat ditemukan!</h3>`;
            } else {
               content.innerHTML = `<h3>Ups.. Halaman tidak dapat diakses</h3>`;
            }
         }
      };

      xhttp.open("GET", `/pages/${page}.html`, true);
      xhttp.send();
      console.log(page);
   }
});