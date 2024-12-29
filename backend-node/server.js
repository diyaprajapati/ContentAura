const express = require('express');
const bodyParser = require('body-parser');
const schemaRoutes = require('./routes/schemaRoutes');
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running');
  });  

// Routes
app.use('/schemas', schemaRoutes);
app.use('/data', dataRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));