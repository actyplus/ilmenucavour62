document.addEventListener('DOMContentLoaded', function() {
    fetch('https://actyplus.github.io/ilmenucavour62/database.csv')
    .then(response => response.text())
    .then(csvText => {
        const jsonData = csvToJson(csvText);
        console.log(jsonData);
    })
    .catch(error => console.error('Error fetching or parsing CSV:', error));
});

function csvToJson(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for(let i = 1; i < lines.length; i++) {
        let obj = {};
        const currentline = lines[i].split(',');

        for(let j = 0; j < headers.length; j++){
            obj[headers[j].trim()] = currentline[j] && currentline[j].trim();
        }
        result.push(obj);
    }

    return result; // This will be an array of objects
}

// Helper function to handle any text transformations if necessary
function transformText(text) {
    // You can add any specific transformations you need to handle here
    return text;
}
