var firestore = firebase.firestore();

//Get Elements
window.storeTask = firestore.collection("Task");

    window.nameTask = $('#nome');
    window.descTask = $('#desc');
    window.anexoTask = $('#anexo');
    window.prioTask = $('#prioridade');
    window.add = $('#adicionar-task');



//Listen for file selection

anexoTask.addEventListener('change', e => {
    //Get File
      var file = e.target.files[0];
    //Create a Storage ref
      var storageRef = firebase.storage().ref(window.name + file.name);
  
    //Upload file
      var task = storageRef.put(file);
  
    //Update progress bar
    task.on('state_changed', 
          function progress(snapshot) {
              var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploader.value = percentage;
          },
  
          function error(err) {
            alert("Something went wrong with the upload")
          },
  
          function complete() {
            alert("Upload done")
          }
      );
    });


    //Add Task
add.on('click', e => {

    e.preventDefault();

    const nome = nameTask.val();
    const descricao = window.descTask.val();
    const anexos = window.anexoTask.val();
    const prioridade = window.prioTask.val();
    const criador = window.name;

    const auth = firebase.auth();

    //Store at Firestore and Firebase
    storeTask.add({
        Nome: nome,
        Descricao: descricao,
        Anexo: anexos,
        Prioridade: prioridade,
        Criador: criador
    }).then(function() {
      $("#popup_add").hide();
    
    }).catch(function(error){
        alert(error);
    });
});

// Add a Realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
  }else {
    console.log('not logged in');
    location.href = "index.html";
  }
});