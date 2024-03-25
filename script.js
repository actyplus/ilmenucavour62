document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('CSV data:', data); // Stampiamo i dati per vedere se il fetch ha funzionato
        const jsonData = csvToJSON(data);
        console.log('JSON data:', jsonData); // Stampiamo il JSON per vedere se il parsing ha funzionato
        populateMenu(jsonData);
    })
    .catch(error => console.error('Error loading the CSV data:', error));
});

// La funzione che converte il CSV in JSON tiene conto delle categorie
function csvToJSON(csvString) {
    const rows = csvString.split('\n');
    const jsonArray = [];
    let currentCategory = {};

    // Salta l'intestazione (indice 0)
    for (let i = 1; i < rows.length; i++) {
        const row = [];
        let match;
        // Regex per riconoscere campi con virgole tra virgolette
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        while (match = regex.exec(rows[i])) {
            row.push(match[0].replace(/\"/g, ""));
        }

        if (row.length > 0) {
            // Se la colonna B è vuota, questa riga rappresenta una categoria
            if (!row[1]) {
                currentCategory = {
                    Sezione: row[0],
                    Descrizione: row[3],
                    Prodotti: []
                };
                jsonArray.push(currentCategory);
            } else {
                // Altrimenti, è un prodotto
                const product = {
                    Prodotto: row[1],
                    Prezzo: row[2],
                    Descrizione: row[3],
                    LinkImmagine: row[4]
                    // Aggiungi qui altri campi se necessario
                };
                currentCategory.Prodotti.push(product);
            }
        }
    }
    return jsonArray;
}

// La funzione di popolamento ora deve gestire le categorie
function populateMenu(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

    data.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category-item';

        const categoryNameElement = document.createElement('h2');
        categoryNameElement.className = 'category-name';
        categoryNameElement.textContent = category.Sezione;
        categoryElement.appendChild(categoryNameElement);

        if (category.Descrizione) {
            const categoryDescriptionElement = document.createElement('p');
            categoryDescriptionElement.className = 'category-description';
            categoryDescriptionElement.textContent = category.Descrizione;
            categoryElement.appendChild(categoryDescriptionElement);
        }

        const productsContainer = document.createElement('div');
        productsContainer.className = 'products-container';

        category.Prodotti.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';

            const productNameElement = document.createElement('h3');
            productNameElement.className = 'product-name';
            productNameElement.textContent = product.Prodotto;
            productElement.appendChild(productNameElement);

            const productPriceElement = document.createElement('span');
            productPriceElement.className = 'product-price';
            productPriceElement.textContent = product.Prezzo;
            productElement.appendChild(productPriceElement);

            if (product.Descrizione) {
                const productDescriptionElement = document.createElement('p');
                productDescriptionElement.className = 'product-description';
                productDescriptionElement.textContent = product.Descrizione;
                productElement.appendChild(productDescriptionElement);
            }

            if (product.LinkImmagine) {
                const imageElement = document.createElement('img');
                imageElement.className = 'product-image';
                imageElement.src = convertDropboxUrlToDirect(product.LinkImmagine);
                productElement.appendChild(imageElement);
            }

            productsContainer.appendChild(productElement);
        });

        categoryElement.appendChild(productsContainer);
        menuContainer.appendChild(categoryElement);
    });
}

// Funzione per convertire le URL di Dropbox in link diretti alle immagini
function convertDropboxUrlToDirect(url) {
    return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
}

// Evento per iniziare il processo dopo il caricamento del DOM
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const jsonData = csvToJSON(data);
            populateMenu(jsonData);
        })
        .catch(error => console.error('Error loading the CSV data:', error));
});
