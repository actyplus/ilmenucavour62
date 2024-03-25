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

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}
