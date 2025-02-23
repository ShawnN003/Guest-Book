import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = 3000;

const contacts = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

app.post('/confirm', (req, res) => {
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.job,
        address: req.body.address,
        location: req.body.location,
        other: req.body.other,
        message: req.body.message,
        mailing: req.body.mailing,
        format: req.body.format,
     };
     contacts.push(contact);
     res.sendFile(`${import.meta.dirname}/views/confirm.html`);
 });



app.get('/admin/contacts', (req, res) => {
    let html = '<h1>Contacts</h1><ul>';
    for (const contact of contacts) {
        html += `<li>${contact.fname} ${contact.lname} - ${contact.email} - ${contact.address} - ${contact.location} - 
        ${contact.other} - ${contact.message} - ${contact.mailing} - ${contact.format}</li>`;
    }
    html += '</ul>';
    res.send(html);
});


 app.get('/back', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
 });

 app.get('/back', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
 });


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 