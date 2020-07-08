document.addEventListener("DOMContentLoaded", function(){
   matchDetail();
   matchHomeTeamDetail();
   let elems = document.querySelectorAll(".tabs");   
   const options = {
      swipeable: true
   };
   M.Tabs.init(elems, options);
})