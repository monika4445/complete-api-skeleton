const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

const productService = {
 getAllProducts : (req, res) => {
      db.all('SELECT * FROM products', [], (err, data) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
        } else {
          res.send(data);
        }
      });
  },

  getProductById: (id) => {
    db.get(`SELECT * FROM products WHERE id=${id}`, (err, data) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal Server Error');
        } else if (!data) {
          res.status(404).send('Product not found.');
        } else {
          res.send(data);
        }
      });
  },

  createProduct : (name, description, price, image) => {
    db.run(
        'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
        [name, description, price, image],
        (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
          } else {
            res.send('Inserted into "products" database.');
          }
        }
      );
  },

  


}