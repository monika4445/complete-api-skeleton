const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.db');

const productService = {
 getAllProducts : (req, res) => {
      db.all('SELECT * FROM products', []);
  },

  getProductById: (id) => {
    db.get(`SELECT * FROM products WHERE id=${id}`);
  },

  createProduct : (name, description, price, image) => {
    db.run(
        'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)',
        [name, description, price, image]
      );
  },

  deleteProductById: (id) => { 
    if (!id) {
        res.status(400).send('Please provide the "id" parameter.');
        return;
      }
    db.run(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
},

updateProductById: (id, name, description, price, image) => {
    db.run(
        'UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?',
        [name, description, price, image, id]);
},

partialUpdateProductById: (id, updates) => {
  const setValues = Object.keys(updates).map(update => `${update} = ?`).join(', ');
  const values = Object.values(updates);

  db.run(`UPDATE dresses SET ${setValues} WHERE id = ?`, [...values, id]);
},


}