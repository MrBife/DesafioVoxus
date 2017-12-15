var firestore = firebase.firestore();

//Get Elements
window.storeTask = firestore.collection("Task");

    window.nameTask = $('#nome');
    window.descTask = $('#desc');
    window.anexoTask = $('#anexo');
    window.prioTask = $('#prioridade');
    window.add = $('#adicionar-task');

    //Add SingUp Event
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