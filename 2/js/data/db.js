let dbPromised = idb.open("liga-bola", 1, upgradeDB => {
   const matchObjectStore = upgradeDB.createObjectStore("match", {keyPath: "id"});
   matchObjectStore.createIndex("id", "id", {unique: false});
});

function saveForLater(match){
   dbPromised
   .then(db => {
      let tx = db.transaction("match", "readwrite");
      let store = tx.objectStore("match");
      console.log(match);
      store.add(match.match);
      return tx.complete;
   })
   .then(() => {
      console.log(`Pertadingan berhasil disimpan!`);
   });
}

function getAll(){
   return new Promise(function(resolve, reject){
     dbPromised
     .then(db => {
        let tx = db.transaction("match", "readonly");
        let store = tx.objectStore("match");
        return store.getAll();
     }) 
     .then(data => {
        resolve(data);
        console.log(data);
     });
   });
}

function getById(id){
   return new Promise(function(resolve, reject){
      dbPromised
      .then(db => {
         let tx = db.transaction("match", "readonly");
         let store = tx.objectStore("match");
         console.log(db);
         return store.get(id);
      })
      .then(data => {
         resolve(data);
         console.log(data);
      });
   });
}