document.addEventListener("DOMContentLoaded", function(){
    
    // Activate sidenav
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
                        // Tutup Sidenav
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    function loadPage(page){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4){
                let content = document.querySelector("#body-content");
                if(this.status == 200){
                    content.innerHTML = xhttp.responseText;
                    if(page == 'home'){
                        // Slider
                        const slider = document.querySelectorAll(".slider");
                        M.Slider.init(slider, {
                            indicators: false,
                            height: 200,
                            duration: 600,
                            interval: 3000
                        });
                    } else if(page == 'flora' || page == 'fauna'){
                        // Toast setup
                        document.querySelectorAll(".toast-trigger").forEach(elm => {
                            elm.addEventListener("click", toast => {
                                toast = M.toast({html: 'menambahkan ke favorit!', displayLength: 2000});
                            });
                        });
                    }
                } else if(this.status == 404){
                    content.innerHTML = "<p>Halaman tidak dapat ditemukan!</p>";
                } else {
                    content.innerHTML = "<p>Ups.. Halaman tidak dapat diakses.</p>";
                }
            }
        };

        xhttp.open("GET",`/pages/${page}.html`, true);
        xhttp.send();
    }
});