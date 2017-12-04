(function() {
    
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
    
        //Get Elements
        const storeUser = firestore.collection("User");
        const txtNome = document.querySelector('#nameCadastro');
        const txtEmail = document.querySelector('#txtEmail');
        const txtPassword = document.querySelector('#txtPassword');
        const btnCadastrar = document.querySelector('#btnCadastrar');    
    
        // Add Signup Event
        btnCadastrar.addEventListener('click', e => {
            //Instanciar Valores          
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const name = txtNome.value;
    
            const auth = firebase.auth();
    
            //Store at Firestore and Firebase    
            auth.createUserWithEmailAndPassword(
                email, 
                pass
            ).then(function() {
                storeUser.add({
                    emailUser: email,
                    nomeUser: name,
                    senhaUser: pass,
                    online: true
                }).then(function() {
                    console.log("Gravado com sucesso!");
                    alert("Seja mais que bem-vindo! ;)")
                }).catch(function (error) {
                    console.log("Houve um erro! - ", error);
                })
    
            }).catch(function (error) {
                alert(error);
            });
        });
        
    
        // Add a Realtime Listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            //https://partiu-160104.firebaseapp.com/menu.html
            console.log(firebaseUser);
            var user = firebase.auth().currentUser;
            location.href = "tasks.html";
            console.log(user.email);
        }else {
            console.log('not logged in');
            //btnLogout.classList.add('hide');
        }
        });
    }());