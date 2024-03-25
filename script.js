document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(data => {
        const jsonData = csvToJSON(data);
        populateMenu(jsonData);
    })
    .catch(error => console.error('Error loading the CSV data:', error));
});

function csvToJSON(csvString) {
    // Questa funzione trasforma il CSV in un array di oggetti JSON.
    // La implementazione esatta può variare in base al formato esatto del tuo CSV.
    const rows = csvString.split('\n');
    const jsonArray = [];
    const headers = rows[0].split(',');

    for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',');
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = rowData[j].trim();
        }
        jsonArray.push(obj);
    }
    return jsonArray;
}

function populateMenu(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; // Pulisce il contenitore del menu prima di popolarlo

    data.forEach(product => {
        if(product.Prodotto && product.C) { // Si assuma che la colonna C contenga i prezzi
            const productElement = document.createElement('div');
            productElement.className = 'product-item';

            const nameElement = document.createElement('h2');
            nameElement.className = 'product-name';
            nameElement.textContent = product.Prodotto;
            productElement.appendChild(nameElement);

            const priceElement = document.createElement('span');
            priceElement.className = 'product-price';
            priceElement.textContent = product.C; // Adattare in base alla colonna corretta se diversa
            productElement.appendChild(priceElement);

            // Aggiungi qui altre proprietà come descrizione e immagine se necessario

            menuContainer.appendChild(productElement);
        }
    });
}
