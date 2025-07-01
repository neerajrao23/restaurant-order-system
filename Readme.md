## API Endpoints

### Menu APIs

| Method | Route             | Description                |
|--------|-------------------|----------------------------|
| GET    | `/api/menu`       | Get all menu items         |
| GET    | `/api/menu/:id`   | Get a single menu item     |
| POST   | `/api/menu`       | Add new menu item (Admin)  |
| PUT    | `/api/menu/:id`   | Update menu item (Admin)   |
| DELETE | `/api/menu/:id`   | Delete menu item (Admin)   |

---

### Order APIs

| Method | Route              | Description                      |
|--------|--------------------|----------------------------------|
| POST   | `/api/orders`      | Place a new order (Customer)     |
| GET    | `/api/orders`      | Get all orders (Admin)           |
| GET    | `/api/orders/:id`  | Get order by ID                  |
| PUT    | `/api/orders/:id`  | Update order status (Admin only) |


For now we can work on these api endpoints