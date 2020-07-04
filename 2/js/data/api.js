const base_url = 'https://api.football-data.org/v2';

// blok kode dipanggil jika fetch berhasil
function status(response){
   if(response.status !== 200){
      console.log(`ERROR : ${response.status}`);
      return Promise.reject(new Error(response.statusText));
   } else {
      return Promise.resolve(response);
   }
}

// untuk parse json ke array
function parseJson(response){
   return response.json();
}

function error(err){
   console.log(`ERROR : ${err}`);
}


function competitionInfo(){
   const options = {
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   };

   fetch(`${base_url}/competitions/2000`, options)
   .then(status)
   .then(parseJson)
   .then(data => {
      const printData = `
      <div class="card">
         <div class="card-image waves-effect waves-block waves-light">
           <img class="activator" src="${data.currentSeason.winner.crestUrl}">
         </div>
         <div class="card-content">
           <span class="card-title activator grey-text text-darken-4">${data.name}<i class="material-icons right">more_vert</i></span>
           <p><a href="#competition-detail">Match Statistic</a></p>
         </div>
         <div class="card-reveal">
           <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
           <p>winner is ${data.currentSeason.winner.name}</p>
         </div>
      </div>`;
      document.getElementById("match").innerHTML = printData;
   });
}