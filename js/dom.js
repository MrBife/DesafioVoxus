(function(){

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyBuilM4aQ5KvKcCV-IZfpHispaG_5LQ6n0",
		authDomain: "desafiovoxus-f0f70.firebaseapp.com",
		databaseURL: "https://desafiovoxus-f0f70.firebaseio.com",
		projectId: "desafiovoxus-f0f70",
		storageBucket: "desafiovoxus-f0f70.appspot.com",
		messagingSenderId: "715184148230"
	};
	firebase.initializeApp(config);
	var firestore = firebase.firestore();


	//Get Users
	var storeUser = firestore.collection("User");

	storeUser.get().then(function(querySnapshot) {
		var allUsers = [];
		querySnapshot.forEach(function(doc) {
			allUsers.push(doc.data());
		});
		console.log(allUsers);
		var getName = allUsers.filter(function (n) {
			return n.emailUser == UserEmail;	
			});
			console.log(getName);
			//Name Header
			$("#titulo").html("Olá, " + getName[0].nomeUser);
			window.name = getName[0].nomeUser;
	});

	//Get Items
	var storeTask = firestore.collection("Task");

	storeTask.onSnapshot(function(querySnapshot) {
		$("#tabela-tasks").empty();

		var allTasks = [];
		querySnapshot.forEach(function(doc) {
			allTasks.push(doc.data());
		});
		console.log(allTasks);

		//Put at table
		var tabela = document.querySelector('#tabela-tasks');
			for (var i = 0; i < allTasks.length; i++) {
				var TR = montaTR(allTasks[i]);
				tabela.appendChild(TR);
			}

			function montaTR(task){
				var TR = document.createElement('tr');
				TR.classList.add('task');
				TR.appendChild(montaTD(task.Nome,'info-nome'));
				TR.appendChild(montaTD(task.Descricao,'info-desc'));
				TR.appendChild(montaTD(task.Anexo,'info-anexo'));
				TR.appendChild(montaTD(task.Prioridade,'info-prioridade'));
				TR.appendChild(montaTD(task.Criador,'info-criador'));
				return TR;
			}

			function montaTD(dado, classe){
				var td = document.createElement('td');
				td.textContent = dado;
				td.classList.add(classe);
				return td;
				}
	});






























	$(".close_window").on("click", function(){
		$("#popup_add").hide();
	});

	$("tbody").on("dblclick", function(e){
		var alvoDoElemento = e.target;
		var paiDoElemento = alvoDoElemento.parentNode;

		console.log()

		e.preventDefault();
		$("#popup_add").show();
		$("#adicionar-task").addClass("hidden");
		$("#editar-task").removeClass("hidden");
		$("#titulo-form").html("Editar Task");

	})

	$("tbody").on("click", function(e){
		var alvoDoElemento = e.target;
		var paiDoElemento = alvoDoElemento.parentNode;

		paiDoElemento.classList.add('done');
	})




































	//Name URL
	//var host = window.location.href;
	//window.name = decodeURI(host.split("?")[1].split("name=")[1]);

	//Close Popup
	$(".close_window").on("click", function(){
		$("#popup_add").hide();
	});

	$("#adicionar").on("click", function(e){
		e.preventDefault();
		$("#popup_add").show();
		$("#adicionar-task").removeClass("hidden");
		$("#editar-task").addClass("hidden");
		$("#titulo-form").html("Adicionar Task");
	});

	//SignOut
	$("#deslogar").on("click", function(e){
		e.preventDefault();
		firebase.auth().signOut().then(function() {
			alert("Desconectado");
		  }).catch(function(error) {
			alert("Erro - " + e);
		  });
	})


	// Add a Realtime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			window.UserEmail = firebaseUser.email;
			console.log(firebaseUser);
		}else {
			console.log('not logged in');
			location.href = "index.html";
		}
		});
})();