document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(csvText => {
        const data = parseCSV(csvText);
        console.log(data); // Debug: Visualizza i dati nel console.log per assicurarsi che siano corretti
    })
    .catch(error => console.error('Error fetching or parsing CSV:', error));
});

function parseCSV(csvText) {
    const rows = csvText.split('\n').map(row => row.split(','));
    const headers = rows.shift(); // Rimuovi la prima riga per ottenere le intestazioni
    const jsonData = rows.map(row => {
        const obj = {};
        headers.forEach((header, i) => {
            obj[header.trim()] = row[i].trim();
        });
        return obj;
    });
    return jsonData;
}
