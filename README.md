# Web Shop Sequelize API

This project provides a small Express + Sequelize API for products, users, and carts.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Start MySQL (example uses docker-compose)

```bash
docker compose up -d
```

3. Run the API

```bash
npm start
```

4. API URL

- Base URL: `http://localhost:3000`

### Notes

- The app automatically syncs the database with `{ force: true }` on startup, so tables are recreated each run.
- A test user is created automatically on startup:
  - `userId: 1`
  - `name: Test User`
  - `email: testuser@example.com`
- A test product is also created with `productId: 1` for quick smoke tests.
- Authentication is **not** implemented.

## Endpoints for Postman

Use environment variable in Postman:

- `baseUrl`: `http://localhost:3000`

### 1) User routes

#### `GET` `/users/all`
- List users

**Postman**
- Method: `GET`
- URL: `{{baseUrl}}/users/all`

#### `POST` `/users/add`
- Create user

**Body** (JSON)

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "passwordHash": "secret",
  "isAdmin": false
}
```

- URL: `{{baseUrl}}/users/add`

### 2) Product routes (public)

#### `GET` `/products`
- List all products
- URL: `{{baseUrl}}/products`

#### `GET` `/products/:id`
- Get one product
- URL: `{{baseUrl}}/products/:id`

Example:
- `GET {{baseUrl}}/products/1`

### 3) Product routes (admin)

#### `GET` `/admin/products`
- List all products (admin scope)
- URL: `{{baseUrl}}/admin/products`

#### `GET` `/admin/product/:id`
- Get one product by ID
- URL: `{{baseUrl}}/admin/product/1`

#### `POST` `/admin/product/add`
- Create new product

**Body** (JSON)

```json
{
  "title": "Blue Mug",
  "price": 12.5,
  "imageUrl": "https://example.com/images/mug.jpg",
  "description": "Ceramic mug",
  "userId": 1
}
```

- URL: `{{baseUrl}}/admin/product/add`

#### `PUT` `/admin/product/:id?edit=true`
- Update product (requires `edit=true` query param)

**Body** (JSON)

```json
{
  "title": "Updated Mug",
  "price": 14,
  "imageUrl": "https://example.com/images/mug-v2.jpg",
  "description": "Updated description"
}
```

- URL: `{{baseUrl}}/admin/product/1?edit=true`

#### `DELETE` `/admin/product/:id`
- Delete product
- URL: `{{baseUrl}}/admin/product/1`

### 4) Cart / shop routes

#### `GET` `/products`
- Same product list endpoint as above (mounted at `/`)
- URL: `{{baseUrl}}/products`

#### `GET` `/cart/:userId`
- Get cart for user
- URL: `{{baseUrl}}/cart/1`

#### `POST` `/cart/:userId/add/:productId`
- Add a product to user's cart
- URL: `{{baseUrl}}/cart/1/add/1`

#### `DELETE` `/cart/:cartId/remove/:productId`
- Remove one unit from cart, or fully remove item when quantity is 1
- URL: `{{baseUrl}}/cart/1/remove/1`

## Suggested Postman collection order

1. `GET {{baseUrl}}/products`
2. `GET {{baseUrl}}/users/all`
3. `POST {{baseUrl}}/users/add`
4. `POST {{baseUrl}}/admin/product/add`
5. `GET {{baseUrl}}/admin/products`
6. `PUT {{baseUrl}}/admin/product/1?edit=true`
7. `GET {{baseUrl}}/cart/1`
8. `POST {{baseUrl}}/cart/1/add/1`
9. `DELETE {{baseUrl}}/cart/1/remove/1`
