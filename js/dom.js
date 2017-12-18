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
	var storage = firebase.storage();


	//Get Users
	var storeUser = firestore.collection("User");

	storeUser.get().then(function(querySnapshot) {
		var allUsers = [];
		querySnapshot.forEach(function(doc) {
			allUsers.push(doc.data());
		});

		var getName = allUsers.filter(function (n) {
			return n.emailUser == UserEmail;	
		});

		//Name Header
		$("#titulo").html("Olá, " + getName[0].nomeUser);
		window.name = getName[0].nomeUser;
	});

	//Get Items
	var storeTask = firestore.collection("Task");

	storeTask.onSnapshot(function(querySnapshot) {
		window.allTasks = [];

		$("#tabela-tasks").empty();

		querySnapshot.forEach(function(doc) {
			var data = doc.data()
			data.id = doc.id;
			window.allTasks.push(data);
		});

		//Put at table
		var tabela = document.querySelector('#tabela-tasks');
		for (var i = 0; i < window.allTasks.length; i++) {
			var TR = montaTR(window.allTasks[i]);
			tabela.appendChild(TR);
		}

		function montaTR(task){
			var TR = document.createElement('tr');
			TR.classList.add('task');
			TR.id = task.id;
			console.log("ae");
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






























	window.actual = {};

	$("tbody").on("dblclick", function(e){
		var $el = $(e.target);
		var paiDoElemento = $el.parentNode;

		e.preventDefault();

		window.allTasks.filter(n => {
			$.each(n, (i, el) => {
				if(el == $el.parent().attr("id")){
					window.actual = n;
				}
			});
		});

		let tdData = [];
		$el.parent().children().each((n, td) => {
			let className = $(td).attr("class").replace("info-", "");
			tdData.push({
				name : className,
				desc : $(td).html()
			});
		});

		$.each(tdData, (e, i) => {
			let $elm = $("#" + i.name);

			if ($elm.attr("type") == "file"){
				$elm.attr("value", i.desc);
			} else {
				$elm.val(i.desc);
			}
		});

		$("#popup_add").show();
		$("#adicionar-task").addClass("hidden");
		$("#editar-task").removeClass("hidden");
		$("#deletar-task").removeClass("hidden");
		$("#titulo-form").html("Editar Task");

	})


	// Update
	$("#editar-task").on("click", e => {
		e.preventDefault();

		let docID = window.actual.id;

	    return storeTask.doc(docID).update(
	    	window.actual
	    ).then(function() {
	    	closePopup();
	        console.log("Document successfully updated!");
	    })
	    .catch(function(error) {
	        // The document probably doesn't exist.
	        console.error("Error updating document: ", error);
	    });
	});


	//Delete
	$("#deletar-task").on("click", e => {
		e.preventDefault();

		let docID = window.actual.id;

	    storeTask.doc(docID).delete().then(function() {
	    	closePopup();
	        console.log("Document successfully deleted!");
	    }).catch(function(error) {
	        console.error("Error removing document: ", error);
	    });
	    
	});


    




























    function closePopup(){
    	$("#popup_add").hide();
		$("#form-adiciona")[0].reset();
		window.actual = {};
    }



	//Name URL
	//var host = window.location.href;
	//window.name = decodeURI(host.split("?")[1].split("name=")[1]);

	//Close Popup
	$(".close_window").on("click", closePopup);

	$("#adicionar").on("click", function(e){
		e.preventDefault();
		$("#popup_add").show();
		$("#adicionar-task").removeClass("hidden");
		$("#editar-task").addClass("hidden");
		$("#deletar-task").addClass("hidden");
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
		}else {
			console.log('not logged in');
			location.href = "index.html";
		}
		});
})();