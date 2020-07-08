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


function matchInfo(){
   const options = {
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   };

   fetch(`${base_url}/competitions/2000/matches`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
      console.log(datas.matches);
      let printData = '';
      datas.matches.forEach(data => {
         printData += `
         <div class="col s12 m6 l6">
            <a href="./pages/match.html?id=${data.id}">
               <div class="card">
                  <div class="card-content white-text">
                     <div class="card-panel teal">          
                        <span class="white-text left">${data.homeTeam.name}</span>
                        <span class="white-text right">${data.awayTeam.name}</span>
                     </div>
                     <div class="center-align black-text abs col s10 m10 l10">VS</div>
                     <span class="black-text left teal score home">${data.score.fullTime.homeTeam}</span>
                     <span class="black-text right teal score away">${data.score.fullTime.awayTeam}</span>
                  </div>
                  <div class="card-content">
                     <span class="black-text left homehead">Home</span>
                     <span class="black-text right awayhead">Away</span>
                  </div>
               </div>
            </a>
         </div>`;
         document.getElementById("match").innerHTML = printData;
      });
   });
}


function matchDetail(){
   return new Promise(function(resolve, reject){
      const urlParam = new URLSearchParams(window.location.search);
      const idParam = urlParam.get("id");
      const options = {
         headers: {
            'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
         }
      };
   // masukinn data satu2 
   // simplyfied the id capture
      fetch(`${base_url}/matches/${idParam}`, options)
      .then(status)
      .then(parseJson)
      .then(data => {
         let printData = `
         <div class="container">
            <div class="card"></div>
         </div`;

         // mengirimkan informasi id dari tiap team untuk memperoleh data tiap team dari api.
         matchHomeTeamDetail(data.match.homeTeam.id);
         matchAwayTeamDetail(data.match.awayTeam.id);

         document.getElementById("match").innerHTML = printData;
         resolve(data);
      });
   });
}


function matchHomeTeamDetail(homeId){
   const options = {
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   };
   fetch(`${base_url}/teams/${homeId}`, options)
   .then(status)
   .then(parseJson)
   .then(data => {
      let printPlayerList = '';
      data.squad.forEach(player => {
         if(player.role == "PLAYER"){
            printPlayerList += `
               <tr>
                  <td>${player.id}</td>
                  <td>${player.name}</td>
                  <td>${player.position}</td>
               </tr>
            `;
         }
      });
      let urlGambar = data.crestUrl;
      if(data.crestUrl == null){
         urlGambar = "";
      } else {
         urlGambar.replace(/^http:\/\//i, 'https://');
      }
      let printData = `
      <div class="container">
         <h3 class="center-align">${data.name}</h3>
         <img class="responsive-img" src="${urlGambar}" />
         <table class="striped">
            <caption>Player</caption>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
               </tr>
            </thead>
            <tbody>${printPlayerList}</tbody>
         </table>
      </div>`;

      // menampilkan data di html
      document.getElementById("homeTeam").innerHTML = printData;
   });
}

function matchAwayTeamDetail(awayId){
   const options = {
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   };
   fetch(`${base_url}/teams/${awayId}`, options)
   .then(status)
   .then(parseJson)
   .then(data => {
      let printPlayerList = '';
      data.squad.forEach(player => {
         if(player.role == "PLAYER"){
            printPlayerList += `
               <tr>
                  <td>${player.id}</td>
                  <td>${player.name}</td>
                  <td>${player.position}</td>
               </tr>
            `;
         }
      });
      let urlGambar = data.crestUrl;
      if(data.crestUrl == null){
         urlGambar = "";
      } else {
         urlGambar.replace(/^http:\/\//i, 'https://');
      }
      let printData = `
      <div class="container">
         <h3 class="center-align">${data.name}</h3>
         <img class="responsive-img" src="${urlGambar}" />
         <table class="striped">
            <caption>Player</caption>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
               </tr>
            </thead>
            <tbody>${printPlayerList}</tbody>
         </table>
      </div>`;

      // menampilkan data di html
      document.getElementById("awayTeam").innerHTML = printData;
   });
}

function standingList(){
   const options = {
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   };

   fetch(`${base_url}/competitions/2000/standings?standingType=TOTAL`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
      let printData = '';
      datas.standings.forEach(data => {
         const header3 = data.group.replace('_', ' ')
         let printTeams = "";
         data.table.forEach(team => {
            let urlGambar = team.team.crestUrl;
            if(team.team.crestUrl == null){
               urlGambar = "";
            } else {
               urlGambar.replace(/^http:\/\//i, 'https://');
            }
            printTeams +=`
            <div class="col s12 m6 l6">
               <div class="card small">
                  <div class="card-image waves-effect waves-block waves-light">
                     <img class="activator responsive" src="${urlGambar}">
                  </div>
                  <div class="card-content">
                     <span class="card-title activator grey-text text-darken-4">${team.team.name}<i class="material-icons right">more_vert</i></span>
                     <p><a href="#">${data.type}</a></p>
                  </div>
                  <div class="card-reveal">
                     <span class="card-title grey-text text-darken-4">${team.team.name}<i class="material-icons right">close</i></span>
                     <p>Here is some more information about this product that is only revealed once clicked on.</p>
                  </div>
               </div>
            </div>`;
         });
      printData += `
         <h3>${header3}</h3>
         <div class="row">
            ${printTeams}
         </div>`;
         document.getElementById("standings").innerHTML = printData; 
      });
   });
}