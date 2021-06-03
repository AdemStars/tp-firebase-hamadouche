const form = document.querySelector('#ajouter'); //selectionné l'élément form du HTML
db.collection('personnes').get().then(
  (mydata)=>{
   mydata.docs.forEach(doc=>{
     console.log(doc.data())
   }) 
   });
//--------------------------------------------------------------------------------
const ul = document.querySelector('#list'); // Seléctionner l'élément list sur le document HTML

 
//---------------------------Fonction Affficher les données -------------------------------------------------
function affiche(doc){
    let li = document.createElement('li'); // Créer une balise li
    let supprimer = document.createElement('div'); // créer une balise div
    let modifier = document.createElement('button'); 
  li.setAttribute('data-id', doc.id) // donner l'identifiant de la personne comme attribut a la liste
  li.textContent=doc.data().Nom + ' ' + doc.data().prenom + ' ' +doc.data().age + ' , id=  ' + doc.id //mettre les données dans la liste
    supprimer.textContent='X' // Ecrite dans la balise supprimer
    modifier.textContent='Modifier' // Ecrite dans la balise modifier
    li.appendChild(supprimer) // intégrer le 'x' dans la balise li
    li.appendChild(modifier) // intégrer le 'modifier' dans la balise li
    ul.appendChild(li);//intégrer la balise li dans la balise ul présente sur le html
    
  //   liid=li.getAttribute("data-id") // attribue a liid l'id en liste
 // alert('li id = ' + liid) // box alert avec "li id" + chaque id en alert"
    
  //-------------function delete data -----------------------
  supprimer.addEventListener('click',(e)=>{
     let id = e.target.parentElement.getAttribute('data-id');
          db.collection("personnes").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        window.location.reload();
    }).catch((error) => {
        console.error("Error removing document: ", error);
        window.location.reload();
    }); 
  })
  //-------------function modifier data -----------------------
  modifier.addEventListener('click',(e)=>{
     let id = e.target.parentElement.getAttribute('data-id');
      //alert
      var wage= window.prompt("entrer l'age")
      var name= window.prompt("entrer le prénom")
      var vorname= window.prompt("entrer le nom")
      // fin alert
          db.collection("personnes").doc(id).update({
              "Nom": vorname,
              "prenom":name,
              "age":wage,
          }).then(() => {
        console.log("Document successfully update!");
        window.location.reload();
    }).catch((error) => {
        console.error("Error updating document: ", error);
        window.location.reload();
    });

  })
  //-------------------------------------------------------------------
}


//----------------------------------------------------------------------------------------------------
 
//--------------------------fonction GET DATA ----------------------------------
db.collection('personnes').get().then(
  (mydata)=>{
   mydata.docs.forEach(doc=>{
      affiche(doc)
   })
     
   });
//--------------------------------------------------------------------------------
//--------------------------------------function ADD DATA --------------------------------------


//--------------------------fonction GET DATA ----------------------------------
form.addEventListener('submit', (e) => { //Actionner l'évenement submit de la form ajouter
  e.preventDefault(); // Empécher l'éxécution de submmit pour laisser la fonction firebase s'éxécuter
  db.collection('personnes').add({
   //----mettre les données de la forme dans les variable à ajouter------
    Nom: form.nom.value, 
    prenom: form.prenom.value,
    age: form.age.value
  }).then(()=>{
     alert('le document a ete ajoute');
      
  });

    
  
  //------Vider les formes ------
  form.nom.value="";
  form.prenom.value="";
  form.age.value="";

    
});



//--------------------------------------------------------------------------------------------------
