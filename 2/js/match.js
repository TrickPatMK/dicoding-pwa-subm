document.addEventListener("DOMContentLoaded", function(){
   let elems = document.querySelectorAll(".tabs");   
   const options = {
      swipeable: false
   };
   M.Tabs.init(elems, options);

   const urlParams = new URLSearchParams(window.location.search);
   const isFromSaved = urlParams.get("saved");

   let saveBtn = document.getElementById("save");
   let matchPage, homeTeam, awayTeam;  

   if(isFromSaved){
      saveBtn.style.display = 'none';
      getSavedMatchDetail();
      getSavedHomeTeamDetail();
      getSavedAwayTeamDetail();
   } else {
      matchPage = matchDetail();
      homeTeam = matchHomeTeamDetail();
      awayTeam = matchAwayTeamDetail();
   }

   saveBtn.onclick = function(){
      console.log(`Menyimpan pertandingan...`);
      matchPage.then(match => {
         saveForLater(match);
      });
      homeTeam.then(home => {
         saveTeam(home);
      });
      awayTeam.then(away => {
         saveTeam(away);
      });
      M.toast({html: 'Menambahkan ke favorite!', displayLength: 2000});
   }
})