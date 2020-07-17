document.addEventListener("DOMContentLoaded", function(){
   let elems = document.querySelectorAll(".tabs");   
   const options = {
      swipeable: false
   };
   M.Tabs.init(elems, options);

   const urlParams = new URLSearchParams(window.location.search);
   const isFromSaved = urlParams.get("saved");

   let saveBtn = document.getElementById("save");
   let matchPage = '';

   if(isFromSaved){
      saveBtn.style.display = 'none';
      getSavedMatchDetail();
   } else {
      matchPage = matchDetail();
   }

   saveBtn.onclick = function(){
      console.log(`Menyimpan pertandingan...`);
      matchPage.then(match => {
         saveForLater(match);
         console.log(match);
      })
   }
})