const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');
const db = mongojs('catalog', ['products']);

const app = express();

const port = 3000;

app.use(bodyParser.json());

// Home
app.get('/', (req, res, next) => {
  res.send('Please use /api/products');
});

// Fetch All Products
app.get('/api/products', (req, res, next) => {
  db.products.find((err, docs) => {
    if(err){
      res.send(err);
    }
    console.log('Products Found...');
    res.json(docs);
  });
});

// Fetch Single Product
app.get('/api/products/:id', (req, res, next) => {
  db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, doc) => {
    if(err){
      res.send(err);
    }
    console.log('Product Found...');
    res.json(doc);
  });
});

// Add Product
app.post('/api/products', (req, res, next) => {
  res.send('Add Product');
});

// Update Product
app.put('/api/products/:id', (req, res, next) => {
  res.send('Update product '+req.params.id);
});

// Delete Product
app.delete('/api/products/:id', (req, res, next) => {
  res.send('Delete product '+req.params.id);
});


app.listen(port, () => {
  console.log('Server started on port '+port);
});
