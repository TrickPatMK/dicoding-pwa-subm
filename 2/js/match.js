document.addEventListener("DOMContentLoaded", function(){
   matchDetail();
   let elems = document.querySelectorAll(".tabs");   
   const options = {
      swipeable: false
   };
   M.Tabs.init(elems, options);
   //let instance = M.Tabs.getInstance(init);

   /*const homeTeam = document.getElementById('homeTeam');
   console.log(instance.select(homeTeam));

   switch(instance){
      case instance.select("homeTeam"):
         console.log('Ini adalah info dari Home Team');
      break;
      case instance.select('match'):
         console.log('Ini adalah info match');
      break;
   default:
      console.log('Ini adalah info dari Away Team');
   }
   gonna finish this config soon
   const getActiveClass = document.getElementsByClassName("active").getAttribute("href");
   console.log(getActiveClass)
   if(getActiveClass.id == "match"){
      console.log('its triggered, you did it');
   }*/
})