document.addEventListener('DOMContentLoaded', function() {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTDFooGfjHhcaYpQFBG2Rlviu-Jd87Ke7VnjDYNieHZMDGMqcb2du83VBA6XNR1KjiDkbV6oVxUvN1Q/pub?output=csv')
    .then(response => response.text())
    .then(data => {
        console.log('CSV Data:', data);
        const jsonData = csvToJSON(data);
        console.log('JSON Data:', jsonData);
        populateMenu(jsonData);
    })
    .catch(error => console.error('Error loading the CSV data:', error));
});

function csvToJSON(csvString) {
    const rows = csvString.split('\n');
    const jsonArray = [];
    const headers = rows[0].split(',');

    for (let i = 2; i < rows.length; i++) { // inizia da 2 per saltare l'intestazione e la prima riga che è l'intestazione delle colonne
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
        if(product.categoria && product.B && product.C) { // Verifica che i campi minimi siano presenti
            const productElement = document.createElement('div');
            productElement.className = 'product-item';

            const nameElement = document.createElement('h2');
            nameElement.className = 'product-name';
            nameElement.textContent = product.B;
            productElement.appendChild(nameElement);

            const priceElement = document.createElement('span');
            priceElement.className = 'product-price';
            priceElement.textContent = product.C;
            productElement.appendChild(priceElement);

            if(product.D) {
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = product.D;
                productElement.appendChild(descriptionElement);
            }

            if(product.E) {
                const imageElement = document.createElement('img');
                imageElement.className = 'product-image';
                imageElement.src = product.E;
                imageElement.style.width = '100px'; // Imposta la dimensione dell'immagine come da richiesta
                productElement.appendChild(imageElement);
            }

            menuContainer.appendChild(productElement);
        }
    });
}
