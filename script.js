async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'marca-table';

    // Adăugăm rândul antetelor
    const headerRow = table.insertRow();
    const headers = ['Nr.', 'Nume']; // Schimbăm denumirile coloanelor
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Iterăm prin date și adăugăm rânduri în tabel
    data.forEach((marca, index) => {
        const row = table.insertRow();
        const cellIndex = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellButton = row.insertCell(2);
        
        cellIndex.textContent = index + 1;
        cellName.textContent = marca.nome;

        const button = document.createElement('button');
        button.textContent = 'Detalii';
        button.className = 'btn-detalii';
        button.addEventListener('click', () => {
            // Aici adaugi logica pentru a naviga către alt API
            console.log(`Buton apăsat pentru marca: ${marca.nome}`);
        });

        const btnContainer = document.createElement('div');
        btnContainer.className = 'btn-container';
        btnContainer.appendChild(button);
        cellButton.appendChild(btnContainer);
    });

    resultsContainer.appendChild(table);
}


document.getElementById('marci-btn').addEventListener('click', async () => {
    console.log('Fetching data...');
    try {
        const data = await fetchData('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        displayResults(data);
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

