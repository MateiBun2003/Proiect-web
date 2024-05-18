
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

function createCarCard(car) {
    const card = document.createElement('div');
    card.className = 'card col-md-3 mb-3';
    card.style.width = '18rem';

    const img = document.createElement('img');
    img.src = car.image;
    img.className = 'card-img-top';
    img.alt = car.model;

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = `${car.make} ${car.model}`;

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.innerHTML = `
        <strong>Year:</strong> ${car.year}<br>
        <strong>Color:</strong> ${car.color}<br>
        <strong>Mileage:</strong> ${car.mileage} km<br>
        <strong>Price:</strong> $${car.price}<br>
        <strong>Fuel Type:</strong> ${car.fuelType}<br>
        <strong>Transmission:</strong> ${car.transmission}<br>
        <strong>Engine:</strong> ${car.engine}<br>
        <strong>Horsepower:</strong> ${car.horsepower} hp<br>
        <strong>Features:</strong> ${car.features.join(', ')}
    `;

    const cardButton = document.createElement('a');
    cardButton.href = '#';
    cardButton.className = 'btn btn-primary';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
}

function displayResults(data) {
    const resultsContainer = document.getElementById('car-cards');
    resultsContainer.innerHTML = '';
    data.forEach(car => {
        const carCard = createCarCard(car);
        resultsContainer.appendChild(carCard);
    });
}

document.getElementById('load-cars-btn').addEventListener('click', async () => {
    console.log('Fetching data...');
    try {
        const data = await fetchData('https://freetestapi.com/api/v1/cars');
        displayResults(data);
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});
