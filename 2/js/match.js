document.addEventListener("DOMContentLoaded", function(){
   matchDetail();
   let elems = document.querySelectorAll(".tabs");   
   const options = {
      swipeable: true
   };
   M.Tabs.init(elems, options);
})