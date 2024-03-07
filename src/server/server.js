const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api', restaurantRoutes);

mongoose.connect('mongodb+srv://marci:nonmaislol@payfood.cqaofhv.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
