const checkWeatherButton = document.getElementById('check-weather');
checkWeatherButton.addEventListener('click', async function () {
    const countryValue = document.getElementById('country').value;
    const cityValue = document.getElementById('city').value;
    const postalcodeValue = document.getElementById('postalcode').value;

    try {
        const responseData = await getCheckWeather(countryValue, cityValue, postalcodeValue);
        console.log('API response:', responseData);

        const resultElement = document.getElementById('result');

        if (responseData !== undefined) {
            resultElement.innerHTML = formatWeatherData(responseData);
        } else {
            resultElement.textContent = 'No weather information for this location now.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function getCheckWeather(country, city, postalcode) {
    try {
        const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?zip=${postalcode}&city=${city}&country=${country}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6f5a692969msh7cd5cae3a681dd4p11e249jsna4fad0497937',
                'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error(`API Request Failed - Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;  // Assuming the API response itself contains the weather data
    } catch (error) {
        throw error;
    }
}

function formatWeatherData(weatherData) {
    return `
        <div class="weather-info">
            <div><strong>Cloud Percentage:</strong> ${weatherData.cloud_pct}</div>
            <div><strong>Temperature:</strong> ${weatherData.temp}°C</div>
            <div><strong>Feels Like:</strong> ${weatherData.feels_like}°C</div>
            <div><strong>Humidity:</strong> ${weatherData.humidity}%</div>
            <div><strong>Min Temperature:</strong> ${weatherData.min_temp}°C</div>
            <div><strong>Max Temperature:</strong> ${weatherData.max_temp}°C</div>
            <div><strong>Wind Speed:</strong> ${weatherData.wind_speed} m/s</div>
            <div><strong>Wind Degrees:</strong> ${weatherData.wind_degrees}°</div>
            <div><strong>Sunrise:</strong> ${new Date(weatherData.sunrise * 1000)}</div>
            <div><strong>Sunset:</strong> ${new Date(weatherData.sunset * 1000)}</div>
        </div>
    `;
}
