async function searchInventory() {
    const q = document.getElementById('query').value;
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    const url = `https://zeerostock-inventory-search.onrender.com/search?q=${q}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(items) {
    const tbody = document.getElementById('resultsBody');
    const noResults = document.getElementById('noResults');
    tbody.innerHTML = ''; 

    if (items.length === 0) {
        noResults.style.display = 'block'; 
    } else {
        noResults.style.display = 'none';
        items.forEach(item => {
            const row = `<tr>
                <td>${item.productName}</td>
                <td>${item.category}</td>
                <td>$${item.price}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    }
}