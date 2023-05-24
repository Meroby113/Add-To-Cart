import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove }  from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js'
const appSetting = {
    databaseURL: "https://playground-8c35c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const cart = ref(database, "ShoppingList");



const input = document.querySelector("#input-field");
const btnAdd = document.querySelector("#add-button");
var ul = document.getElementById("shopping-list");

btnAdd.addEventListener("click", function () {
    let inputValue = input.value;
    push(cart, inputValue);
    clearInputValue();
    
})

onValue(cart, function (snapshot) {

    if(snapshot.exists()) {
        let cartListArray = Object.entries(snapshot.val());
         showShoppingListOnScreen(cartListArray);
    } else {
        ul.innerHTML = "No items here ....yet!";
        
    }
    
    
    
})

function clearInputValue() {
    input.value = "";
}

function addNewItemToShoppingListli(currentItem) {
    let key = currentItem[0];
    let value = currentItem[1];
    var li = document.createElement("li");
    li.id = key;

    li.addEventListener("click", function () {
        let urlOFlocation = "ShoppingList/" + key;
        let exactLocationOfCart = ref(database, urlOFlocation);
        remove(exactLocationOfCart);
    })
    li.innerText = value;
    ul.appendChild(li);
}

function showShoppingListOnScreen (cartListArray) {
    clearScreen();
    for (let i = 0; i < cartListArray.length; i++) {

        let currentItem = cartListArray[i];
    
        addNewItemToShoppingListli(currentItem);
    }
}

function clearScreen () {
    ul.innerHTML = "";
}

