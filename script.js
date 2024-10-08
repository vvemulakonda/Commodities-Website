document.addEventListener('DOMContentLoaded', () => {
    // Fetch Wheat Price Graph (mock data for now, real data could come from another API)
    const ctx = document.getElementById('wheatChart').getContext('2d');
    const wheatChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'], // Example years
            datasets: [{
                label: 'Wheat Price (USD/ton)',
                data: [200, 220, 250, 270, 300], // Mock data for wheat price
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price in USD/ton'
                    }
                }
            }
        }
    });

    // Real-time USD to EUR Exchange Rate using exchangerate.host API
    const exchangeRateUrl = 'https://api.exchangerate.host/latest?base=USD&symbols=EUR';
    fetch(exchangeRateUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates.EUR;
            document.getElementById('usdRate').innerText = `${rate.toFixed(2)} EUR`;
        })
        .catch(error => {
            console.error('Error fetching exchange rate:', error);
            document.getElementById('usdRate').innerText = 'Failed to fetch rate';
        });

    // Real-time News using NewsAPI
    const newsApiKey = 'your_newsapi_key'; // Replace with your NewsAPI key
    const newsUrl = `https://newsapi.org/v2/everything?q=wheat&apiKey=${newsApiKey}`;

    const newsFeed = document.getElementById('newsFeed');
    fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
            newsFeed.innerHTML = '';
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsFeed.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsFeed.innerText = 'Failed to fetch news';
        });
});
