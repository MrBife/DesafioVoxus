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

    //Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword')
    const btnLogIn = document.getElementById('btnLogIn')

    //Add Login Event
    btnLogIn.addEventListener('click', e => {
        //Get Email and Pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
        promise.catch(e => alert(e.message));
    });

    // Add a Realtime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        //https://partiu-160104.firebaseapp.com/menu.html
        location.href = "tasks.html";
        console.log(firebaseUser);
    }else {
        console.log('not logged in');
        //btnLogout.classList.add('hide');
    }
    });
}());