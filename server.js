const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = 'API KEY'; // replace with your actual API key

app.use(express.static('public')); 
app.use(express.json());

app.get('/weather', async (req, res) => {
  const { city, state } = req.query;
  try {
    
    const fetch = await import('node-fetch').then(module => module.default);

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});