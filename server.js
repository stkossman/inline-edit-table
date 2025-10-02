import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Designer" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Manager" },
    { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Developer" },
    { id: 6, name: "Frank Wilson", email: "frank@example.com", role: "Analyst" },
    { id: 7, name: "Grace Lee", email: "grace@example.com", role: "Designer" }
];

function getUserById(id) {
    return users.find(u => u.id === id);
}

function renderDisplayRow(user) {
    return `
    <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
            <button hx-get="/edit/${user.id}" hx-target="closest tr" hx-swap="outerHTML">Edit</button>
        </td>
    </tr>`;
}

function renderEditRow(user) {
    return `
    <tr>
        <td><input type="text" name="name" value="${user.name}" autofocus></td>
        <td><input type="email" name="email" value="${user.email}"></td>
        <td><input type="text" name="role" value="${user.role}"></td>
        <td>
            <button hx-post="/save/${user.id}" hx-include="closest tr" hx-target="closest tr" hx-swap="outerHTML">Save</button>
            <button hx-get="/cancel/${user.id}" hx-target="closest tr" hx-swap="outerHTML">Cancel</button>
        </td>
    </tr>`;
}

app.get('/', (req, res) => {
    const tableRows = users.map(renderDisplayRow).join('');
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inline Edit Table - htmx</title>
        <script src="https://unpkg.com/htmx.org@1.9.12"></script>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="container">
            <h1>Inline Edit Table - htmx</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
    </body>
    </html>
    `);
});

app.get('/edit/:id', (req, res) => {
    const user = getUserById(parseInt(req.params.id));
    if (user) {
        res.send(renderEditRow(user));
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/save/:id', (req, res) => {
    const user = getUserById(parseInt(req.params.id));
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        res.send(renderDisplayRow(user));
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/cancel/:id', (req, res) => {
    const user = getUserById(parseInt(req.params.id));
    if (user) {
        res.send(renderDisplayRow(user));
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
