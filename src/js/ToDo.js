import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, remove, update } from "firebase/database";
// import { getDatabase, ref, onValue} from "firebase/database";

import { DB_TO_DO_LIST, FIREBASE_CONFIG, PATH } from "./const.js";
import { inputRef, buttonRef, listRef } from "./refs.js";
const app = initializeApp(FIREBASE_CONFIG);
const db = getDatabase();
console.log(app);



listRef.addEventListener('click', onListClick);
buttonRef.addEventListener('click', handlerClick);

function handlerClick() {
    const value = inputRef.value.trim();
    if (!value) {
      return  
    }
    saveData(value)
    createMarkup();
}


async function createMarkup() {
    try {
        let arrayData = await getData();
        if (!arrayData.length) {
            return
        }
        listRef.innerHTML = murkup(arrayData);
    } catch (error) {
        { (error) => console.log(error) };
    }
}

function saveData(value) {
    const time = Date.now();
    const data = {
        value,
        approved: false,
        id: time,
    }
    set(ref(db, 'listItems/' + time), data);   
}

function getData() {
    return new Promise((resolve, reject) => {
        onValue(ref(db, PATH), (snapshot) => {
            const data = snapshot.val();
            
            if (!data) {
                (error) => reject(new Error); 
            } else {
                resolve(Object.values(data));
            }
        });
    })
}

async function onListClick(event) {
    if (event.target.tagName !== 'LI') {
        return
    }
    let arrayData = await getData();
    const item = getObject(arrayData, event.target.dataset.id);
    item.approved = !item.approved;
        update(ref(db, PATH + item.id), item);
    createMarkup();
}

function getObject(arrayData, id) {
    return arrayData.find(arrayItem => arrayItem.id === Number(id))
}

async function onClose(e) {
    e.preventDefault();
    if (e.target.tagName !== 'BUTTON') {
        return
    }
    try {
        let arrayData = await getData();
        const icon = e.target.firstChild;
        e.target.innerHTML = '';
    } catch (error) {
        console.log(error);
    } 
}   

function deleteItem(item) {
    remove(ref(db, PATH + item.id))
}