document.addEventListener('DOMContentLoaded', function() {
    fetchCSVAndDisplay('https://actyplus.github.io/ilmenucavour62/database.csv', 'menu-container');
});

function fetchCSVAndDisplay(url, containerId) {
    fetch(url)
    .then(response => response.text())
    .then(csvText => {
        const jsonData = csvToJSON(csvText);
        populateMenu(jsonData, containerId);
    })
    .catch(error => console.error('Error fetching or converting the CSV:', error));
}

function csvToJSON(csvText) {
    const lines = csvText.split('\n');
    const keys = lines[0].split(',').map(key => key.trim());
    // Skip empty lines and headers
    return lines.slice(1).filter(line => line).map(line => {
        const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).map(value => value.trim().replace(/^"|"$/g, ''));
        return keys.reduce((object, key, index) => {
            object[key] = values[index];
            return object;
        }, {});
    });
}

function populateMenu(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container

    items.forEach(item => {
        if (item.Prodotto && item.Sezione !== '') { // Check if the row is a product entry
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            
            const nameElement = document.createElement('h3');
            nameElement.textContent = item.Prodotto;
            productDiv.appendChild(nameElement);

            const priceElement = document.createElement('p');
            priceElement.textContent = item.Prezzo;
            productDiv.appendChild(priceElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = item.Descrizione;
            productDiv.appendChild(descriptionElement);

            if (item.LinkImmagine) {
                const imageElement = document.createElement('img');
                imageElement.src = item.LinkImmagine;
                imageElement.alt = item.Prodotto;
                productDiv.appendChild(imageElement);
            }

            container.appendChild(productDiv);
        }
    });
}
