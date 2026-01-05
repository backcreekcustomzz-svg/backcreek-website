require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const checkoutRouter = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve client static files (optional)
app.use(express.static(path.join(__dirname, '..', 'client')));

app.use('/api', checkoutRouter);

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
