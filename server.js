const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thoughts-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Use this to log mongo queries being made
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));