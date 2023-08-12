

const fs = require('fs');
const axios = require('axios');

// Get the search term from command line argument
const searchTerm = process.argv[2];

// Check if the search term is provided
if (!searchTerm) {
  console.log('Please provide a search term as a command line argument.');
  process.exit(1);
}

// key 
const apiKey = '918efd267d6aa74b01bab68c84f359b7';

// Function to make API request and handle the response
async function fetchData(searchTerm) {
  try {
    // API request using axios
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${apiKey}`);
    
    // data from the API response
    const data = response.data;
    
    // Check if the API returns a valid response
    if (data.cod === 200) {
      // Display the weather information
      console.log('Weather Information:');
      console.log('City:', data.name);
      console.log('Temperature:', data.main.temp, 'K');
      console.log('Description:', data.weather[0].description);
      
      // Save the data to a text file
      fs.writeFile('weather_info.txt', JSON.stringify(data), err => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Data saved to weather_info.txt');
        }
      });
    } else {
      console.log('No weather information found for the given city.');
    }
  } catch (error) {
    console.error('Error making API request:', error.message);
  }
}

// Call the function with the provided search term
fetchData(searchTerm);
