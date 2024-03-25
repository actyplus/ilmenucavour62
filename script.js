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
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim().replace(/^"(.*)"$/, '$1'));
        return keys.reduce((object, key, index) => {
            object[key] = values[index];
            return object;
        }, {});
    });
}

function populateMenu(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        ['Sezione', 'Prodotto', 'Prezzo', 'Descrizione'].forEach(key => {
            const span = document.createElement('span');
            span.textContent = item[key];
            productDiv.appendChild(span);
        });

        container.appendChild(productDiv);
    });
}
