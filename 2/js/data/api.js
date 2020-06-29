const base_url = 'https://api.football-data.org/v2/';

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

function getTeamList(){
   const options = {
      headers : {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   }
   fetch(`${base_url}teams`, options)
   .then(status)
   .then(parseJson)
   .then(data => {
      let showInHTML = "";
      data.teams.forEach(team => {
         //const url = url.replace(/^http:\/\//i, 'https://');
         showInHTML =`
         <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
               <img class="activator" src="${team.crestUrl}">
            </div>
            <div class="card-content">
               <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more_vert</i></span>
               <p><a href="#">This is a link</a></p>
            </div>
            <div class="card-reveal">
               <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
               <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
         </div>`;
      });

      console.log(showInHTML);
      document.getElementById("body-content").innerHTML = showInHTML;
   });
}

function teamInfo(){
   const options = {
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   };

   fetch(`${base_url}`)
}