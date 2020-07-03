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


function matchInfo(){
   const options = {
      mode: 'no-cors',
      headers: {
         'X-Auth-Token': 'a4f16bcf809a415b9399a45eda437443'
      }
   }

   fetch(`${base_url}2001/standings`, options)
   .then(status)
   .then(parseJson)
   .then(datas => {
      datas.standings.forEach(data => {
         console.log(data);
      });
   });
}