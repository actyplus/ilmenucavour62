document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(csvText => {
        const jsonData = csvToJSON(csvText);
        console.log(jsonData); // Controlla la console per assicurarti che i dati siano corretti.
        populateMenu(jsonData);
    })
    .catch(error => console.error('Error fetching or parsing CSV:', error));
});

function csvToJSON(csvText) {
    const lines = csvText.split('\n').map(line => line.trim());
    const headers = lines[0].split(',').map(header => header.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
        return headers.reduce((object, header, index) => {
            object[header] = values[index];
            return object;
        }, {});
    });
}

function populateMenu(items) {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; // Svuota il contenitore prima di riempirlo

    items.forEach(item => {
        if (item.Prodotto && item.Prezzo) { // Assicurati che ci siano il prodotto e il prezzo
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';

            const nameElement = document.createElement('h2');
            nameElement.className = 'product-name';
            nameElement.textContent = item.Prodotto;
            productDiv.appendChild(nameElement);

            const priceElement = document.createElement('span');
            priceElement.className = 'product-price';
            priceElement.textContent = item.Prezzo;
            productDiv.appendChild(priceElement);

            if (item.Descrizione) {
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = item.Descrizione;
                productDiv.appendChild(descriptionElement);
            }

            // Se hai un campo per le immagini, aggiungilo qui
            if (item.LinkImmagine) {
                const imageElement = document.createElement('img');
                imageElement.src = item.LinkImmagine;
                productDiv.appendChild(imageElement);
            }

            container.appendChild(productDiv);
        }
    });
}
