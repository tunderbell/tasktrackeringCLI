const fs = require('fs');

// Read all lines from a text file
const text = fs.readFileSync('quotes.txt', 'utf8');

// Split the file into an array of lines
const lines = text.split('\n').filter(line => line.trim() !== '');

// Choose a random line
const randomIndex = Math.floor(Math.random() * lines.length);
const randomLine = lines[randomIndex];

// Print the random line
console.log(randomLine);
