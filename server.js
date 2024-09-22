const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    const userId = "your_fullname_ddmmyyyy";  // Replace with dynamic values
    const email = "your_college_email@example.com";
    const roll_number = "your_roll_number";
    
    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    
    // Find highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(ch => ch === ch.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    // Handle file validation (Example)
    let file_valid = false;
    let file_mime_type = "";
    let file_size_kb = 0;

    if (file_b64) {
        file_valid = true;
        file_mime_type = "application/pdf";  // Example, use actual decoding logic
        file_size_kb = 1500;  // Replace with actual size
    }

    res.json({
        is_success: true,
        user_id: userId,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb
    });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

