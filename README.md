# Inline Edit Table

A minimalist inline editing data table built with htmx and Express. This project is a part of my "Frameworks Mini Projects" where I'm trying and getting to know minimalist frameworks.

## Live Demo

[Render - Inline Edit Table](https://inline-edit-table.onrender.com/)

## Features

- **Inline Row Editing**
- **htmx interaction**
- **Server-side HTML fragments**

## Tech Stack

- **htmx**
- **Node.js + Express** (Backend server)
- **Vanilla CSS**

## Installation

```
npm install
```

## Usage

```
node server.js
```

Open `http://localhost:3000` in browser.

## How it works

Click "Edit" to tranfsorm any row into editable input fields. The "Save" button updates data and restores display mode. The "Cancel" button reverts changes without saving. All interactions use htmx attributes to swap HTML fragments from the server without page reloads.