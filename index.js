const express = require('express');
const app = express();
const PORT = 8080;

app.get('/health', (req, res) => {
    res.send('OK');
});

const fruits = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' }
];

app.get('/fruits', (req, res) => {
    res.send(fruits);
});

app.get('/fruits/:id', (req, res) => {
    const fruitId = parseInt(req.params.id);
    const fruit = fruits.find(f => f.id === fruitId);
    if (!fruit) {
        res.status(404).send('Not found');
    } else {
        res.send(fruit);
    }
});

app.post('/fruits', (req, res) => {
    const fruit = {
        id: fruits.length + 1,
        name: req.body.name
    };
    fruits.push(fruit);
    res.send(fruit);
});

app.put('/fruits/:id', (req, res) => {
    const fruitId = parseInt(req.params.id);
    const fruit = fruits.find(f => f.id === fruitId);
    if (!fruit) {
        res.status(404).send('Not found');
    } else {
        fruit.name = req.body.name;
        res.send(fruit);
    }
});

app.delete('/fruits/:id', (req, res) => {
    const fruitId = parseInt(req.params.id);
    const fruit = fruits.find(f => f.id === fruitId);
    if (!fruit) {
        res.status(404).send('Not found');
    } else {
        fruits.splice(fruits.indexOf(fruit), 1);
        res.send(fruit);
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});