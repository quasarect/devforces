// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes'); // Ensure this file exists and is exported correctly
const commandRoutes = require('./routes/commandRoutes'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Use the quiz routes
app.use('/api/quiz', quizRoutes);

// Use the command routes
app.use('/api/command', commandRoutes); // Ensure this line is present

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
