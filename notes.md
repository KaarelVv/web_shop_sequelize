docker exec -it mysql-container-sequelize mysql -u root -p


Here are all the localhost endpoints for product routes in this project (base http://localhost:3000 from index.js), with methods:

User routes (mounted at /):

GET http://localhost:3000/products
GET http://localhost:3000/products/:id
Admin routes (mounted at /admin):

POST http://localhost:3000/admin/product/add
GET http://localhost:3000/admin/products
GET http://localhost:3000/admin/product/:id
PUT http://localhost:3000/admin/product/:id
DELETE http://localhost:3000/admin/product/:id
If you want the edit-only rule, you’d call:
PUT http://localhost:3000/admin/product/:id?edit=true

Say the word if you want me to add/edit the middleware for that check.