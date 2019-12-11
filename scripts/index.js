const API = `https://anapioficeandfire.com/api/`;

const categoryContainer = document.querySelector(`.js-category`);
const masterlistContainer = document.querySelector(`.js-masterlist`);
const detailContainer = document.querySelector(`.js-detail`);

function propFrom(obj, prop) {
    return obj[prop];
}

function nameToItem(name) {
    const item = document.createElement('li');
    item.textContent = name;
    return item;
}

function keysToItems(obj) {
    return Object.keys(obj).map(nameToItem);
}

function fetchOnClick(el, URL, handlerFn) {
    el.addEventListener('click', () => {
        fetch(URL)
            .then(r => r.json())
            .then(handlerFn)
    })
}

function clearContainer(container) {
    container.textContent = '';
}

function appendToContainer(el, container) {
    container.appendChild(el);
}

function renderCategories(catObj) {
    clearContainer(categoryContainer);
    clearContainer(masterlistContainer);
    clearContainer(detailContainer);

    const categoryItems = keysToItems(catObj);
    categoryItems.forEach(catItem => {
        fetchOnClick(catItem, `${catObj[catItem.textContent]}`, renderMasterList);
        appendToContainer(catItem, categoryContainer);
    });            
}

function fetchCategories() {
    fetch(API)
        .then(r => r.json()) // convert to usable JS, automatically return
        .then(renderCategories) 
}

function renderMasterList(masterArray) {

    clearContainer(masterlistContainer);
    clearContainer(detailContainer);

    // each item in masterArray looks like:
    /*
    {
        "url":"https://anapioficeandfire.com/api/houses/1",
        "name":"House Algood",
        "region":"The Westerlands",
        "coatOfArms":"A golden wreath,
         on a blue field with a gold border(Azure,
         a garland of laurel within a bordure or)",
        "words":"",
        "titles":[""],
        "seats":[""],
        "currentLord":"",
        "heir":"",
        "overlord":"https://anapioficeandfire.com/api/houses/229",
        "founded":"",
        "founder":"",
        "diedOut":"",
        "ancestralWeapons":[""],
        "cadetBranches":[],
        "swornMembers":[]}     
    */
    const listItems = masterArray
                        .map(item => propFrom(item, 'name'))
                        .map(nameToItem);
    
    // Using a for-loop so I can iterate through 2 arrays in parallel.
    // We need each item in listItems
    // but we also need the original object (to access the URL)
    for (let i = 0; i < masterArray.length; i++) {
        const item = listItems[i];
        const originalObject = masterArray[i];
        fetchOnClick(item, propFrom(originalObject, 'url'), renderDetails);
        appendToContainer(item, masterlistContainer);
    }
}

function keyValuePairToRow(key, val) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.textContent = key;
    const td2 = document.createElement('td');
    td2.textContent = val;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}

function objectToTable(obj) {
    const table = document.createElement('table');
    for (let key of Object.keys(obj)) {
        const tr = keyValuePairToRow(key, obj[key]);
        table.appendChild(tr);
    }
    return table;
}

function renderDetails(detailObj) {

    clearContainer(detailContainer);
    // Each detailObj looks like this:
    /*
        {
            "url":"https://www.anapioficeandfire.com/api/houses/1",
            "name":"House Algood",
            "region":"The Westerlands",
            "coatOfArms":"A golden wreath,
            on a blue field with a gold border(Azure,
            a garland of laurel within a bordure or)",
            "words":"",
            "titles":[""],
            "seats":[""],
            "currentLord":"",
            "heir":"",
            "overlord":"https://www.anapioficeandfire.com/api/houses/229",
            "founded":"",
            "founder":"",
            "diedOut":"",
            "ancestralWeapons":[""],
            "cadetBranches":[],
            "swornMembers":[]
        }
    */
    const table = objectToTable(detailObj);
    detailContainer.appendChild(table);
}


function main() {
    fetchCategories();
}

main();