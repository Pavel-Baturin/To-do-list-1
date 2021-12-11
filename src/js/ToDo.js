import { DB_TO_DO_LIST } from "./const.js";

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
    if (!arrayData.length) {
        return
    }
    const murkup = arrayData.map(({ id, value, approved }) => {
        const check = approved ? 'checked' : "";
        return `<li class="${check}"data-id="${id}">${value}<li>`;
    });
    console.log(murkup);
    listRef.innerHTML = murkup.join('');
    
}

function saveData(value) {
    let arrayData = getData();
   
    const data = {
        value,
        approved: false,
        id: Date.now(),
    }
    arrayData.push(data);
    localStorage.setItem(DB_TO_DO_LIST, JSON.stringify(arrayData))
}
function getData() {
    const data = localStorage.getItem(DB_TO_DO_LIST);
    return !data ? [] : JSON.parse(data);
}

function onListClick(event) {
    if (event.target.tagName !== 'LI') {
        return
    }
    let arrayData = getData();
    
    console.log(event.target.dataset.id)
}
