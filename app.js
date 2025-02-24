import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = 3000;

const contacts = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/confirm', (req, res) => {
    const contact = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        address: req.body.address,
        location: req.body.location,
        other: req.body.other,
        message: req.body.message,
        mailing: req.body.mailing,
        format: req.body.format,
        timestamp: new Date()
     };
     contacts.push(contact);
     if(req.body.fname == "" || req.body.lname =="" || req.body.email == "")
     {
        res.send('INVALID INPUT');
     }
     else 
     {
        res.render('confirm', { contact });
     }
 });



app.get('/list', (req, res) => {
    res.render('admin', { contacts });
});


 app.get('/back', (req, res) => {
    res.render('index');
 });

 app.get('/contactList', (req, res) => {
    res.render('/admin/contacts');
 });

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 