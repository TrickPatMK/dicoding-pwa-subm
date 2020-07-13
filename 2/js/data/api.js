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


function matchInfo(){
   fetch(`${base_url}/competitions/2000/matches?group=Group A`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
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

         // Home Team setup
         switch(score.home._fulltime){
            case null:
               score.home._fulltime = '-';
            break;
            case '':
               score.home._fulltime = '0';
         default:
            score.home._fulltime;
         }

         switch(score.home._halftime){
            case null:
               score.home._halftime = '-';
            break;
            case '':
               score.home._halftime = '0';
         default:
            score.home._halftime;
         }

         switch(score.home._extratime){
            case null:
               score.home._extratime = '-';
            break;
            case '':
               score.home._extratime = '0';
         default:
            score.home._extratime;
         }

         switch(score.home.penalties){
            case null:
               score.home.penalties = '-';
            break;
            case '':
               score.home.penalties = '0';
         default:
            score.home.penalties;
         }

         // Away Team setup
         switch(score.away._fulltime){
            case null:
               score.away._fulltime = '-';
            break;
            case '':
               score.away._fulltime = '0';
         default:
            score.away._fulltime;
         }

         switch(score.away._halftime){
            case null:
               score.away._halftime = '-';
            break;
            case '':
               score.away._halftime = '0';
         default:
            score.away._halftime;
         }
         
         switch(score.away._extratime){
            case null:
               score.away._extratime = '-';
            break;
            case '':
               score.away._extratime = '0';
         default:
            score.away._extratime;
         }

         switch(score.away.penalties){
            case null:
               score.away.penalties = '-';
            break;
            case '':
               score.away.penalties = '0';
         default:
            score.away.penalties;
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
                  <td>${score.home._fulltime}</td>
                  <th class="center-align">Full-time</th>
                  <td>${score.away._fulltime}</td>
               </tr>
               <tr>
                  <td>${score.home._halftime}</td>
                  <th class="center-align">Half-time</th>
                  <td>${score.away._halftime}</td>
               </tr>
               <tr>
                  <td>${score.home._extratime}</td>
                  <th class="center-align">Extra-time</th>
                  <td>${score.away._extratime}</td>
               </tr>
               <tr>
                  <td>${score.home.penalties}</td>
                  <th class="center-align">Penalties</th>
                  <td>${score.away.penalties}</td>
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
         matchHomeTeamDetail(data.match.homeTeam.id, h2hData.homeTeam.wins, h2hData.homeTeam.draws, h2hData.homeTeam.losses);
         console.log(`Home Team Id: ${data.match.homeTeam.id, h2hData.homeTeam.wins, h2hData.homeTeam.draws, h2hData.homeTeam.losses}`)
         matchAwayTeamDetail(data.match.awayTeam.id, h2hData.awayTeam.wins, h2hData.awayTeam.draws, h2hData.awayTeam.losses);
         console.log(`Away Team Id: ${data.match.awayTeam.id, h2hData.awayTeam.wins, h2hData.awayTeam.draws, h2hData.awayTeam.losses}`)

         document.getElementById("match").innerHTML = printData;
         resolve(data);
      });
   });
}

function matchHomeTeamDetail(homeId, wins, draws, losses){
   fetch(`${base_url}/teams/${homeId}`, options)
   .then(status)
   .then(parseJson)
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

         <table class="centered">
            <thead>
               <tr>
                  <th>Wins</th>
                  <th>Draws</th>
                  <th>Losses</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>${wins}</td>
                  <td>${draws}</td>
                  <td>${losses}</td>
               </tr>
            </tbody>
         </table>
         <br />

         ${printPlayerList}
      </div>`;

      // menampilkan data di html
      document.getElementById("homeTeam").innerHTML = printData;
   });
}

function matchAwayTeamDetail(awayId, wins, draws, losses){
   fetch(`${base_url}/teams/${awayId}`, options)
   .then(status)
   .then(parseJson)
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

         <br/>

         <table class="centered">
            <thead>
               <tr>
                  <th>Wins</th>
                  <th>Draws</th>
                  <th>Losses</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>${wins}</td>
                  <td>${draws}</td>
                  <td>${losses}</td>
               </tr>
            </tbody>
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
   fetch(`${base_url}/competitions/2000/standings?standingType=TOTAL`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
      let printData = '';
      datas.standings.forEach(data => {
         let standingGroup = data.group;
         if(standingGroup == 'GROUP_A'){
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
                  <div class="card">
                     <div class="card-title">
                        <span class="left">#${team.position}</span>
                        <div class="center-align">${team.team.name}</div>
                     </div>
                     <div class="card-content">
                        <table class="centered">
                           <thead>
                              <tr>
                                 <th>Matches</th>
                                 <th>Win</th>
                                 <th>Goals</th>
                                 <th>Point</th>
                              </tr>
                           </thead>
                           <tbody>
                              <td>${team.playedGames}</td>
                              <td>${team.won}</td>
                              <td>${team.goalsFor}</td>
                              <td>${team.points}</td>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>`;
            });
            printData += `
               <h3>Standings</h3>
               <div class="row">
                  ${printTeams}
               </div>`
            ;
         } 
      });
      document.getElementById("standings").innerHTML = printData;
   });
}