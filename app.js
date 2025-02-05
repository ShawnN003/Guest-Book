import express from 'express';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

const contacts = [];

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

app.post('/confirm', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
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
     console.log(contacts);
     res.sendFile(`${import.meta.dirname}/views/confirm.html`);
 });

 app.get('/admin/contacts', (req, res) => {
    res.send(contacts);
});

 app.get('/back', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/index.html`);
 });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 