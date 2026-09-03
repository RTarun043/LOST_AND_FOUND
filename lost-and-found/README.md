# Lost and Found Web App

A simple full stack Lost and Found system.

## Structure
- `backend/` - Node.js + Express server, stores data in `items.json`
- `frontend/` - Plain HTML, CSS, and JavaScript

## How to run

### 1. Backend
```
cd backend
npm install
npm start
```
Server runs at http://localhost:5000

### 2. Frontend
Just open `frontend/index.html` in your browser
(or use a tool like VS Code Live Server)

## Features
- Report a lost or found item
- View all reports, search and filter by type
- Mark an item as resolved
- Delete a report

## API Endpoints
- `GET /api/items` - get all items (supports `?type=` and `?search=`)
- `GET /api/items/:id` - get a single item
- `POST /api/items` - create a new item
- `PATCH /api/items/:id/resolve` - mark item as resolved
- `DELETE /api/items/:id` - delete an item
