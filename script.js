document.addEventListener('DOMContentLoaded', function() {
    // Esempio di struttura JSON che ci si aspetta dal file CSV
    const exampleData = [
        {
            "categoria": "Caffè",
            "nome": "Caffè Espresso",
            "prezzo": "1.00€",
            "descrizione": "Un classico intramontabile, l'espresso che dà energia.",
            "immagine": "https://link.all.immagine/espresso.png"
        },
        {
            "categoria": "Caffè",
            "nome": "Caffè Americano",
            "prezzo": "1.30€",
            "descrizione": "Perfetto per chi ama diluire il momento del caffè nel tempo.",
            "immagine": "https://link.all.immagine/americano.png"
        }
        // ... altri prodotti
    ];

    const menuContainer = document.getElementById('menu-container');

    exampleData.forEach(function(product) {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        
        const nameElement = document.createElement('h2');
        nameElement.className = 'product-name';
        nameElement.textContent = product.nome;
        productElement.appendChild(nameElement);
        
        const priceElement = document.createElement('span');
        priceElement.className = 'product-price';
        priceElement.textContent = product.prezzo;
        productElement.appendChild(priceElement);
        
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = product.descrizione;
        productElement.appendChild(descriptionElement);
        
        const imageElement = document.createElement('img');
        imageElement.className = 'product-image';
        imageElement.src = product.immagine;
        productElement.appendChild(imageElement);
        
        menuContainer.appendChild(productElement);
    });
});
