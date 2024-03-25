document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(data => {
        const jsonData = csvToJSON(data);
        populateMenu(jsonData);
    })
    .catch(error => console.error('Error loading the CSV data:', error));
});

// Funzione aggiornata per gestire i campi con virgole
function csvToJSON(csvString) {
    const rows = csvString.split('\n');
    const jsonArray = [];

    // Salta l'intestazione e gestisci le righe
    for (let i = 1; i < rows.length; i++) {
        const row = [];
        let match;
        // Regex per riconoscere campi con virgole tra virgolette
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        while (match = regex.exec(rows[i])) {
            row.push(match[0].replace(/\"/g, ""));
        }
        if (row.length > 0) {
            const obj = {
                Sezione: row[0],
                Prodotto: row[1],
                Prezzo: row[2],
                Descrizione: row[3],
                LinkImmagine: row[4]
                // Aggiungi qui altri campi se necessario
            };
            jsonArray.push(obj);
        }
    }
    return jsonArray;
}

function populateMenu(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

    data.forEach(product => {
        if (product.Prodotto && product.Prezzo) {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';

            const nameElement = document.createElement('h2');
            nameElement.className = 'product-name';
            nameElement.textContent = product.Prodotto;
            productElement.appendChild(nameElement);

            const priceElement = document.createElement('span');
            priceElement.className = 'product-price';
            priceElement.textContent = product.Prezzo;
            productElement.appendChild(priceElement);

            if (product.Descrizione) {
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = product.Descrizione;
                productElement.appendChild(descriptionElement);
            }

            if (product.LinkImmagine) {
                const imageElement = document.createElement('img');
                imageElement.className = 'product-image';
                imageElement.src = convertDropboxUrlToDirect(product.LinkImmagine);
                productElement.appendChild(imageElement);
            }

            menuContainer.appendChild(productElement);
        }
    });
}

function convertDropboxUrlToDirect(url) {
    return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
}
