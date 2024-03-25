document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(text => {
        const data = csvToArray(text);
        console.log(data);  // Per vedere i dati in console e verificarne la struttura
        // Qui potrai poi chiamare le funzioni per popolare la pagina web
    })
    .catch(error => console.error('Errore durante il caricamento del CSV:', error));
});

// Funzione aggiornata per gestire i campi con virgolette correttamente
function csvToJSON(csvString) {
    const rows = csvString.split('\n');
    const jsonArray = [];

    // Estrai le intestazioni (headers)
    const headers = rows[0].split(',');
    for (let i = 1; i < rows.length; i++) {
        const row = [];
        let current = '';
        let inQuotes = false;

        // Scorri ogni carattere della riga per gestire le virgolette
        for (let char of rows[i]) {
            if (char === '"' && inQuotes) {
                inQuotes = false;
            } else if (char === '"' && !inQuotes) {
                inQuotes = true;
            } else if (char === ',' && !inQuotes) {
                row.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        if (current.length > 0) {
            row.push(current); // Aggiungi l'ultimo campo alla riga
        }

        // Crea un oggetto JSON per la riga, utilizzando le intestazioni
        const obj = headers.reduce((acc, header, idx) => {
            acc[header.trim()] = (row[idx] || "").trim().replace(/\"/g, "");
            return acc;
        }, {});

        jsonArray.push(obj);
    }
    return jsonArray;
}
