
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

document.getElementById('registerButton').addEventListener('click', (event) =>{
    register();
});

document.getElementById('loginButton').addEventListener('click', (event) =>{
    console.log('join');
    login();
});

function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;

  console.log(email, username, password, name, surname);


  if (!validateEmail(email) || !validatePassword(password)) {
    alert("Email or password is incorrect!");
    return;
  }

  if (
    !validateField(username) ||
    !validateField(name) ||
    !validateField(surname)
  ) {
    alert("One of the extra fields are incorrect!");
    return;
  }


  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function(){
        var user = auth.currentUser;
        var databaseRef = dataBase.ref();

        var userData = {
            email: email,
            userName: username,
            name: name,
            surname: surname,
            lastLogin: Date.now()
        }

        databaseRef.child('users/' + user.uid).set(userData);

        alert('User created!');
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage + ' ' + errorCode);
    });
}

function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!validateEmail(email) || !validatePassword(password)) {
        alert("Email or password is incorrect!");
        return;
    }

    auth.signInWithEmailAndPassword(email, password).then(function(){
        var user = auth.currentUser;
        var databaseRef = dataBase.ref();

        var userData = {
            lastLogin: Date.now()
        }

        databaseRef.child('users/' + user.uid).update(userData);

        alert('User logged!');
    })
    .catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    alert(errorMessage + ' ' + errorCode);
    });

}

function validateEmail(email) {
  pattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}/

  if (pattern.test(email) === true) {
    return true;
  }
  return false;
}

function validatePassword(password) {
  if (password.length < 6) return false;
  return true;
}

function validateField(field) {
  if (field === null) return false;

  if (field.length <= 0) return false;
  return true;
}



