const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 8080;
const analiticas = {visitas: {
    items: 0,
    item: 0
}};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function getProducts(){
    const products = fs.readFileSync('productos.txt', 'utf-8');
    return JSON.parse(products);
};

app.get('/items', (req, res) =>{
    analiticas.visitas.items++;
    const products = getProducts();
    const response = [{
        items: products,
        cantidad: products.length
    }];
    res.send(response);
});

app.get('/item-random', (req, res) =>{
    analiticas.visitas.item++;
    const products = getProducts();
    res.send(products[getRandomNumber(0,products.length)]);
});

app.get('/visitas', (req, res) =>{
    res.send(analiticas);
    
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
