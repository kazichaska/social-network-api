const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// console.log("testing");
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtsdb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);


// Use this to log mongo queries being made
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});