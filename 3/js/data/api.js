const base_url = 'https://api.football-data.org/v2';
const options = {
   headers: {
      'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
   }
};

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

// Index Page
function matchInfo(){
   function htmlData(datas){
      let printData = '';
      datas.matches.forEach(data => {
         printData += `
         <div class="col s12 m6 l6">
            <a href="./pages/match.html?id=${data.id}&home=${data.homeTeam.id}&away=${data.awayTeam.id}">
               <div class="card">
                  <div class="card-content white-text">
                     <div class="card-panel green darken-1">          
                        <span class="white-text left">${data.homeTeam.name}</span>
                        <span class="white-text right">${data.awayTeam.name}</span>
                     </div>
                     <div class="center-align black-text abs col s10 m10 l10">VS</div>
                     <span class="white-text left green darken-1 score home">${data.score.fullTime.homeTeam}</span>
                     <span class="white-text right green darken-1 score away">${data.score.fullTime.awayTeam}</span>
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
   }

   if('caches' in window){
      caches.match(`${base_url}/competitions/2000/matches?group=Group A`)
      .then(response => {
         if(response){
            parseJson(response)
            .then(datas => {
               htmlData(datas);
            });
         }
      });
   }
   
   fetch(`${base_url}/competitions/2000/matches?group=Group A`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
      htmlData(datas);
   });
}

// Match Page
function matchDetail(){
   return new Promise(function(resolve, reject){
      const urlParam = new URLSearchParams(window.location.search);
      const idParam = urlParam.get("id");

      fetch(`${base_url}/matches/${idParam}`, options)
      .then(status)
      .then(parseJson)
      .then(data => {
         let printReferees = '';
         const h2hData = data.head2head;
         data.match.referees.forEach(person => {
            printReferees += `
            <tr>
               <td>${person.id}</td>
               <td>${person.name}</td>
            </tr>`;
         });
         let score = {
            home:{
               _fulltime: data.match.score.fullTime.homeTeam,
               _halftime: data.match.score.halfTime.homeTeam,
               _extratime: data.match.score.extraTime.homeTeam,
               penalties: data.match.score.penalties.homeTeam
            },
            away:{
               _fulltime: data.match.score.fullTime.awayTeam,
               _halftime: data.match.score.halfTime.awayTeam,
               _extratime: data.match.score.extraTime.awayTeam,
               penalties: data.match.score.penalties.awayTeam
            }
         }
        
         // [0]home.full || [1]home.half || [2]home.extra || [3]home.penal || [4]away.full || [5]away.half || [6]away.extra || [7]away.penal
         const scoreType = new Array(score.home._fulltime, score.home._halftime, score.home._extratime, score.home.penalties, score.away._fulltime, score.away._halftime, score.away._extratime, score.away.penalties);
         for(let i = 0; i <= 7; i++){
            switch(scoreType[i]){
               case null:
                  scoreType[i] = '-';
               break;
               case '':
                  scoreType[i] = '0';
               break;
            default:
               scoreType[i];
            }
         }

         let printData = `
         <div class="container">
            <table class="centered" rules="all">
               <thead>
                  <tr>
                     <th>Venue</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>${data.match.venue}</td>
                  </tr>
               </tbody>
            </table>

            <br />

            <h4 class="center-align">Score</h4>
            <table class="centered">
               <tr>
                  <td>${scoreType[0]}</td>
                  <th class="center-align">Full-time</th>
                  <td>${scoreType[4]}</td>
               </tr>
               <tr>
                  <td>${scoreType[1]}</td>
                  <th class="center-align">Half-time</th>
                  <td>${scoreType[5]}</td>
               </tr>
               <tr>
                  <td>${scoreType[2]}</td>
                  <th class="center-align">Extra-time</th>
                  <td>${scoreType[6]}</td>
               </tr>
               <tr>
                  <td>${scoreType[3]}</td>
                  <th class="center-align">Penalties</th>
                  <td>${scoreType[7]}</td>
               </tr>
            </table>

            <br />

            <h5 class="center-align">Referees</h5>
            <table class="centered">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>Name</th>
                  </tr>
               </thead>
               <tbody>
                  ${printReferees}
               </tbody>
            </table>
         </div`;

         document.getElementById("match").innerHTML = printData;
         resolve(data);
      });
   });
}

function matchHomeTeamDetail(){
   return new Promise((resolve, reject) => {
      const urlParam = new URLSearchParams(window.location.search);
      const homeParam = urlParam.get("home");

      function htmlData(homeData){
         let playerList = '';
         let printPlayerList = '';
         let coachName = '-';
         homeData.squad.forEach(player => {
            if(player.role == "PLAYER"){
               playerList += `
                  <tr>
                     <td>${player.id}</td>
                     <td>${player.name}</td>
                     <td>${player.position}</td>
                  </tr>
               `;
            } else if(player.role == "COACH"){
               if(player.name != '') coachName = player.name;
            }
         });
         if(playerList == ''){
            printPlayerList = `<p>Sorry, player data isn't available.</p>`;
         } else {
            printPlayerList = `
               <h4 class="center-align">Player</h4>
               <table class="striped">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                     </tr>
                  </thead>
                  <tbody>${playerList}</tbody>
               </table>
            `;
         }
         let urlGambar = homeData.crestUrl;
         let printImage = '';
         if(homeData.crestUrl == null || homeData.crestUrl == ''){
            urlGambar = "";
         } else {
            urlGambar.replace(/^http:\/\//i, 'https://');
            printImage = `
               <figure class="z-depth-3">
                  <img class="responsive-img center-align" src="${urlGambar}" />
               </figure>
            `;
         }
         let printData = `
            <div class="container">
               <h3 class="center-align">${homeData.tla} - ${homeData.name}</h3>
               ${printImage}
               <table>
                  <tr>
                     <th>Club Colors</th>
                     <td>: ${homeData.clubColors}</td>
                  </tr>
                  <tr>
                     <th>Coach</th>
                     <td>: ${coachName}</td>
                  </tr>
               </table>
            
               <br/>
            
               ${printPlayerList}
            </div>`;
            
         // menampilkan data di html
         document.getElementById("homeTeam").innerHTML = printData;
         resolve(homeData);
      }
      if('caches' in window){
         caches.match(`${base_url}/teams/${homeParam}`)
         .then(response => {
            if(response){
               parseJson(response)
               .then(homeData => {
                  htmlData(homeData);
               });
            }
         })
      }
      
      fetch(`${base_url}/teams/${homeParam}`, options)
      .then(status)
      .then(parseJson)
      .then(homeData => {
         htmlData(homeData);
      });
   });
}

function matchAwayTeamDetail(){
   return new Promise((resolve, reject) => {
      const urlParam = new URLSearchParams(window.location.search);
      const awayParam = urlParam.get("away");
      function htmlData(awayData){
         let playerList = '';
         let printPlayerList = '';
         let coachName = '-';
         awayData.squad.forEach(player => {
            if(player.role == "PLAYER"){
               playerList += `
                  <tr>
                     <td>${player.id}</td>
                     <td>${player.name}</td>
                     <td>${player.position}</td>
                  </tr>
               `;
            } else if(player.role == "COACH"){
               if(player.name != '') coachName = player.name;
            }
         });
         if(playerList == ''){
            printPlayerList = `<p>Sorry, player data isn't available.</p>`;
         } else {
            printPlayerList = `
               <h4 class="center-align">Player</h4>
               <table class="striped">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                     </tr>
                  </thead>
                  <tbody>${playerList}</tbody>
               </table>
            `;
         }
         let urlGambar = awayData.crestUrl;
         let printImage = '';
         if(awayData.crestUrl == null || awayData.crestUrl == ''){
            urlGambar = "";
         } else {
            urlGambar.replace(/^http:\/\//i, 'https://');
            printImage = `
               <figure class="z-depth-3">
                  <img class="responsive-img center-align" src="${urlGambar}" />
               </figure>
            `;
         }
         let printData = `
            <div class="container">
               <h3 class="center-align">${awayData.tla} - ${awayData.name}</h3>
               ${printImage}
               <table>
                  <tr>
                     <th>Club Colors</th>
                     <td>: ${awayData.clubColors}</td>
                  </tr>
                  <tr>
                     <th>Coach</th>
                     <td>: ${coachName}</td>
                  </tr>
               </table>
         
               <br/>
      
               ${printPlayerList}
            </div>
         `;
            
         // menampilkan data di html
         document.getElementById("awayTeam").innerHTML = printData;
         resolve(awayData);
      }
      if('caches' in window){
         caches.match(`${base_url}/teams/${awayParam}`)
         .then(response => {
            if(response){
               parseJson(response)
               .then(awayData => {
                  htmlData(awayData);
               });
            }
         })
      }
      
      fetch(`${base_url}/teams/${awayParam}`, options)
      .then(status)
      .then(parseJson)
      .then(awayData => {
         htmlData(awayData);
      });
   });
}

// Favorites Page
function getSavedMatchInfo(){
   getAll()
   .then(datas => {
      let printData = '';
      datas.forEach(data => {
         printData += `
         <div class="col s12 m6 l6">
            <a href="./pages/match.html?id=${data.id}&home=${data.homeTeam.id}&away=${data.awayTeam.id}&saved=true">
               <div class="card">
                  <div class="card-content white-text">
                     <div class="card-panel green darken-1">          
                        <span class="white-text left">${data.homeTeam.name}</span>
                        <span class="white-text right">${data.awayTeam.name}</span>
                     </div>
                     <div class="center-align black-text abs col s10 m10 l10">VS</div>
                     <span class="black-text left green darken-1 score home">${data.score.fullTime.homeTeam}</span>
                     <span class="black-text right green darken-1 score away">${data.score.fullTime.awayTeam}</span>
                  </div>
                  <div class="card-content">
                     <span class="black-text left homehead">Home</span>
                     <span class="black-text right awayhead">Away</span>
                  </div>
                  <div class="card-action">
                     <a class="right button" href="#" onclick="deleteMatch(${data.id})">Delete</a>
                  </div>
               </div>
            </a>
         </div>`;
         document.getElementById("match").innerHTML = printData;
      });
   })
}

function deleteMatch(match){
   deleteFromDb(match);
   getSavedMatchInfo();
   M.toast({html: 'Match telah dihapus!', displayLength: 2000});
}

function getSavedMatchDetail(){
   const urlParam = new URLSearchParams(window.location.search);
   const idParam = parseInt(urlParam.get("id"));

   getMatchById(idParam)
   .then(data => {
      console.log(data);
      let printReferees = '';
         data.referees.forEach(person => {
            printReferees += `
            <tr>
               <td>${person.id}</td>
               <td>${person.name}</td>
            </tr>`;
         });
         let score = {
            home:{
               _fulltime: data.score.fullTime.homeTeam,
               _halftime: data.score.halfTime.homeTeam,
               _extratime: data.score.extraTime.homeTeam,
               penalties: data.score.penalties.homeTeam
            },
            away:{
               _fulltime: data.score.fullTime.awayTeam,
               _halftime: data.score.halfTime.awayTeam,
               _extratime: data.score.extraTime.awayTeam,
               penalties: data.score.penalties.awayTeam
            }
         }
        
      // [0]home.full || [1]home.half || [2]home.extra || [3]home.penal || [4]away.full || [5]away.half || [6]away.extra || [7]away.penal
      const scoreType = new Array(score.home._fulltime, score.home._halftime, score.home._extratime, score.home.penalties, score.away._fulltime, score.away._halftime, score.away._extratime, score.away.penalties);
      for(let i = 0; i <= 7; i++){
         switch(scoreType[i]){
            case null:
               scoreType[i] = '-';
            break;
            case '':
               scoreType[i] = '0';
            break;
         default:
            scoreType[i];
         }
      }

      let printData = `
      <div class="container">
         <table class="centered" rules="all">
            <thead>
               <tr>
                  <th>Venue</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>${data.venue}</td>
               </tr>
            </tbody>
         </table>

         <br />

         <h4 class="center-align">Score</h4>
         <table class="centered">
            <tr>
               <td>${scoreType[0]}</td>
               <th class="center-align">Full-time</th>
               <td>${scoreType[4]}</td>
            </tr>
            <tr>
               <td>${scoreType[1]}</td>
               <th class="center-align">Half-time</th>
               <td>${scoreType[5]}</td>
            </tr>
            <tr>
               <td>${scoreType[2]}</td>
               <th class="center-align">Extra-time</th>
               <td>${scoreType[6]}</td>
            </tr>
            <tr>
               <td>${scoreType[3]}</td>
               <th class="center-align">Penalties</th>
               <td>${scoreType[7]}</td>
            </tr>
         </table>

         <br />

         <h5 class="center-align">Referees</h5>
         <table class="centered">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
               </tr>
            </thead>
            <tbody>
               ${printReferees}
            </tbody>
         </table>
      </div`;

      // mengirimkan informasi id dari tiap team untuk memperoleh data tiap team dari api.
      document.getElementById("match").innerHTML = printData;
   });
}

function getSavedHomeTeamDetail(){
   const urlParam = new URLSearchParams(window.location.search);
   const idParam = parseInt(urlParam.get("home"));

   getTeamById(idParam)
   .then(homeData => {
      let playerList = '';
      let printPlayerList = '';
      let coachName = '-';
      homeData.squad.forEach(player => {
         if(player.role == "PLAYER"){
            playerList += `
               <tr>
                  <td>${player.id}</td>
                  <td>${player.name}</td>
                  <td>${player.position}</td>
               </tr>
            `;
         } else if(player.role == "COACH"){
            if(player.name != '') coachName = player.name;
         }
      });
      if(playerList == ''){
         printPlayerList = `<p>Sorry, player data isn't available.</p>`;
      } else {
         printPlayerList = `
         <h4 class="center-align">Player</h4>
         <table class="striped">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
               </tr>
            </thead>
            <tbody>${playerList}</tbody>
         </table>`;
      }
      let urlGambar = homeData.crestUrl;
      let printImage = '';
      if(homeData.crestUrl == null || homeData.crestUrl == ''){
         urlGambar = "";
      } else {
         urlGambar.replace(/^http:\/\//i, 'https://');
         printImage = `
         <figure class="z-depth-3">
            <img class="responsive-img center-align" src="${urlGambar}" />
         </figure>`;
      }
      let printData = `
      <div class="container">
         <h3 class="center-align">${homeData.tla} - ${homeData.name}</h3>
         ${printImage}
         <table>
            <tr>
               <th>Club Colors</th>
               <td>: ${homeData.clubColors}</td>
            </tr>
            <tr>
               <th>Coach</th>
               <td>: ${coachName}</td>
            </tr>
         </table>

         <br/>

         ${printPlayerList}
      </div>`;

      // menampilkan data di html
      document.getElementById("homeTeam").innerHTML = printData;
   });
}

function getSavedAwayTeamDetail(){
   const urlParam = new URLSearchParams(window.location.search);
   const idParam = parseInt(urlParam.get("away"));

   getTeamById(idParam)
   .then(awayData => {
      let playerList = '';
      let printPlayerList = '';
      let coachName = '-';
      awayData.squad.forEach(player => {
         if(player.role == "PLAYER"){
            playerList += `
               <tr>
                  <td>${player.id}</td>
                  <td>${player.name}</td>
                  <td>${player.position}</td>
               </tr>
            `;
         } else if(player.role == "COACH"){
            if(player.name != '') coachName = player.name;
         }
      });
      if(playerList == ''){
         printPlayerList = `<p>Sorry, player data isn't available.</p>`;
      } else {
         printPlayerList = `
         <h4 class="center-align">Player</h4>
         <table class="striped">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
               </tr>
            </thead>
            <tbody>${playerList}</tbody>
         </table>`;
      }
      let urlGambar = awayData.crestUrl;
      let printImage = '';
      if(awayData.crestUrl == null || awayData.crestUrl == ''){
         urlGambar = "";
      } else {
         urlGambar.replace(/^http:\/\//i, 'https://');
         printImage = `
         <figure class="z-depth-3">
            <img class="responsive-img center-align" src="${urlGambar}" />
         </figure>`;
      }
      let printData = `
      <div class="container">
         <h3 class="center-align">${awayData.tla} - ${awayData.name}</h3>
         ${printImage}
         <table>
            <tr>
               <th>Club Colors</th>
               <td>: ${awayData.clubColors}</td>
            </tr>
            <tr>
               <th>Coach</th>
               <td>: ${coachName}</td>
            </tr>
         </table>
         
         <br />

         ${printPlayerList}
      </div>`;

      // menampilkan data di html
      document.getElementById("awayTeam").innerHTML = printData;
   });
}

// Standings Page
function standingList(){
   if('caches' in window){
      caches.match(`${base_url}/competitions/2000/matches?group=Group A`)
      .then(response => {
         if(response){
            parseJson(response)
            .then(datas => {
               let printData = '';
               datas.standings.forEach(data => {
                  let standingGroup = data.group;
                  if(standingGroup == 'GROUP_A'){
                     let printTeams = "";
                     data.table.forEach(team => {
                        printTeams +=`
                        <tr>
                           <td>${team.position}</td>
                           <td>${team.team.name}</td>
                           <td>${team.playedGames}</td>
                           <td>${team.won}</td>
                           <td>${team.goalsFor}</td>
                           <td>${team.points}</td>
                        </tr>`;
                     });
                     printData += `
                     <h3>Standings</h3>
                     <table class="centered">
                        <thead>
                           <tr>
                              <th>Position</th>
                              <th>Team</th>
                              <th>Matches</th>
                              <th>Win</th>
                              <th>Goals</th>
                              <th>Point</th>
                           </tr>
                        </thead>
                        <tbody>
                           ${printTeams}
                        </tbody>
                     </table>`;
                  } 
               });
               document.getElementById("standings").innerHTML = printData;
            });
         }
      });
   }
   
   fetch(`${base_url}/competitions/2000/standings?standingType=TOTAL`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
      let printData = '';
      datas.standings.forEach(data => {
         let standingGroup = data.group;
         if(standingGroup == 'GROUP_A'){
            let printTeams = "";
            data.table.forEach(team => {
               printTeams +=`
               <tr>
                  <td>${team.position}</td>
                  <td>${team.team.name}</td>
                  <td>${team.playedGames}</td>
                  <td>${team.won}</td>
                  <td>${team.goalsFor}</td>
                  <td>${team.points}</td>
               </tr>`;
            });
            printData += `
            <h3>Standings</h3>
            <table class="centered">
               <thead>
                  <tr>
                     <th>Position</th>
                     <th>Team</th>
                     <th>Matches</th>
                     <th>Win</th>
                     <th>Goals</th>
                     <th>Point</th>
                  </tr>
               </thead>
               <tbody>
                  ${printTeams}
               </tbody>
            </table>`;
         } 
      });
      document.getElementById("standings").innerHTML = printData;
   });
}