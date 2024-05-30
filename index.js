const firebaseConfig = {
    apiKey: "AIzaSyB-CPzeAjiMUF8TfppjvhVv_5g7MClXs0Y",
    authDomain: "cars-e1e49.firebaseapp.com",
    projectId: "cars-e1e49",
    storageBucket: "cars-e1e49.appspot.com",
    messagingSenderId: "1017470217325",
    appId: "1:1017470217325:web:8eb4a6c2cc67a157b6e364",
    measurementId: "G-GV7ZBXSW7D",
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const dataBase = firebase.database();

  var username = document.getElementById("username");

window.onload = function(){
    auth.onAuthStateChanged((user) => {
        // Select the elements
        if(user !== null){
            document.getElementById("masini").style.display = "block"; // Show the element with id "masini"
            document.getElementById("contact").style.display = "block"; // Show the element with id "masini"
      }else{
            username.textContent = "UserName:";
            document.getElementById("masini").style.display = "none";
            document.getElementById("contact").style.display = "none";
      }
    });
    
}

document.getElementById('logout').addEventListener('click', (event) =>{
    logout();
  });

function logout(){
    auth.signOut().then(() => {
      // Sign-out successful.
      var user = auth.currentUser;
      if (user === null) {
        username.textContent = "UserName:";
      }
      alert('User logged out!');
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;   
      var errorMessage = error.message;
  
      alert(errorMessage + ' ' + errorCode);
    });
  }
