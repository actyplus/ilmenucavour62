document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(csv => {
        let data = parseCSV(csv);
        displayMenu(data);
    })
    .catch(error => console.error('Errore nel caricamento del CSV:', error));
});

function parseCSV(csv) {
    let lines = csv.split('\n');
    let headers = lines[0].split(',');
    let result = lines.slice(1).map(line => {
        let values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        if(values) {
            let object = {};
            headers.forEach((header, i) => {
                object[header.trim()] = values[i].trim().replace(/^"|"$/g, '');
            });
            return object;
        }
        return null;
    }).filter(Boolean);
    return result;
}

function displayMenu(data) {
    let menu = document.getElementById('menu-container');
    let categories = {};

    data.forEach(item => {
        if(!categories[item.Sezione]) {
            categories[item.Sezione] = [];
        }
        categories[item.Sezione].push(item);
    });

    Object.keys(categories).forEach(category => {
        let categoryDiv = document.createElement('div');
        let categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        categories[category].forEach(item => {
            let itemDiv = document.createElement('div');
            let itemName = document.createElement('span');
            let itemPrice = document.createElement('span');
            let itemDesc = document.createElement('span');

            itemName.textContent = item.Prodotto;
            itemPrice.textContent = item.Prezzo;
            itemDesc.textContent = item.Descrizione;

            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(itemDesc);

            categoryDiv.appendChild(itemDiv);
        });

        menu.appendChild(categoryDiv);
    });
}
