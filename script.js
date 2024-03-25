document.addEventListener('DOMContentLoaded', function() {
    fetchCSVAndDisplay('https://actyplus.github.io/ilmenucavour62/database.csv', 'menu-container');
});

function fetchCSVAndDisplay(url, containerId) {
    fetch(url)
    .then(response => response.text())
    .then(csvText => {
        const jsonData = csvToJSON(csvText);
        const groupedData = groupBySection(jsonData);
        populateMenu(groupedData, containerId);
    })
    .catch(error => console.error('Error fetching or converting the CSV:', error));
}

function csvToJSON(csvText) {
    const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
    const headers = lines[0].split(',').map(header => header.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim().replace(/^"|"$/g, ''));
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
}

function groupBySection(items) {
    return items.reduce((acc, item) => {
        (acc[item['Sezione']] = acc[item['Sezione']] || []).push(item);
        return acc;
    }, {});
}

function populateMenu(groupedItems, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    Object.keys(groupedItems).forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';

        const sectionTitle = document.createElement('h2');
        sectionTitle.textContent = section;
        sectionDiv.appendChild(sectionTitle);

        groupedItems[section].forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = item['Prodotto'];
            productDiv.appendChild(nameSpan);

            const priceSpan = document.createElement('span');
            priceSpan.textContent = item['Prezzo'];
            productDiv.appendChild(priceSpan);

            const descSpan = document.createElement('span');
            descSpan.textContent = item['Descrizione'];
            productDiv.appendChild(descSpan);

            sectionDiv.appendChild(productDiv);
        });

        container.appendChild(sectionDiv);
    });
}
