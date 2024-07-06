
const weatherForm = document.getElementById('weather-form');
const weatherResult = document.getElementById('weather-result');

// Event listener for form submission
weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  try {
    const response = await fetch(`/weather?city=${city}&state=${state}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();

    // Function to convert Kelvin to Fahrenheit
    const kelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9/5 + 32).toFixed(2);

    // Prepare HTML to display weather data
    const html = `
      <h2 class="text-xl font-semibold mb-2">${data.name}, ${data.sys.country}</h2>
      <div class="flex justify-center items-center mb-4">
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}" class="h-16 w-16 mr-2">
        <span class="text-2xl">${kelvinToFahrenheit(data.main.temp)}°F</span>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Weather</h3>
          <p class="mb-1">${data.weather[0].description}</p>
        </div>
        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Humidity</h3>
          <p class="mb-1">${data.main.humidity}%</p>
        </div>
        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Wind Speed</h3>
          <p class="mb-1">${data.wind.speed} m/s</p>
        </div>
        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="font-semibold mb-2">Pressure</h3>
          <p class="mb-1">${data.main.pressure} hPa</p>
        </div>
      </div>
    `;

    // Update weatherResult div with formatted HTML
    weatherResult.innerHTML = html;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherResult.innerHTML = '<p class="text-red-500">Failed to fetch weather data. Please try again.</p>';
  }
});