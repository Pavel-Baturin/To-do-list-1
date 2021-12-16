import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getDatabase, ref, set } from "firebase/database";
import { getDatabase, ref, onValue} from "firebase/database";

import { DB_TO_DO_LIST, FIREBASE_CONFIG, PATH } from "./const.js";

const app = initializeApp(FIREBASE_CONFIG);
const db = getDatabase();
console.log(app);

const inputRef = document.querySelector("input");
const buttonRef = document.querySelector("button");
const listRef = document.querySelector("#myUL");

listRef.addEventListener('click', onListClick);
buttonRef.addEventListener('click', handlerClick);

function handlerClick() {
    const value = inputRef.value.trim();
    if (!value) {
      return  
    }
    saveData(value)
    creatMurkup();
}

creatMurkup();
function creatMurkup() {
    let arrayData = getData();
    //     if (!arrayData.length) {
    //         return
    //     }
    //     const murkup = arrayData.map(({ id, value, approved }) => {
    //         const check = approved ? 'checked' : "";
    //         return `<li class="${check}"data-id="${id}">${value}<li>`;
    //     });
    //     console.log(murkup);
    //     listRef.innerHTML = murkup.join('');
    }

    function saveData(value) {
        // let arrayData = getData();
        const time = Date.now();
        const data = {
            value,
            approved: false,
            id: time,
        }

        function writeUserData(userId, name, email, imageUrl) {
            set(ref(db, 'listItems/' + time), data);
        }
        // arrayData.push(data);
        // localStorage.setItem(DB_TO_DO_LIST, JSON.stringify(arrayData))
    }

    function getData() {
        // const data = localStorage.getItem(DB_TO_DO_LIST);
        // return !data ? [] : JSON.parse(data);
        const promise = new Promise((resolve, reject) => {  onValue(ref(db, PATH), (snapshot) => {
            const data = snapshot.val();
        });})
        
      
        const items = Object.values(data);
    }

    function onListClick(event) {
        if (event.target.tagName !== 'LI') {
            return
        }
        let arrayData = getData();
    
        console.log(event.target.dataset.id)
    }

