import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';
import validateForm from './services/validation.js';


dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`)
    }
}

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

const contacts = [];

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/confirm', async (req, res) => {
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

     const conn = await connect();

     const insertQuery = await conn.query(`insert into record 
        (fname, lname, email, address, location, other,message,mailing,format,timestamp)
        values (?, ?, ?, ?, ?, ?,?,?,?,?)`,
        [ contact.fname, contact.lname, contact.email, contact.address, 
            contact.location, contact.other,contact.message,contact.mailing,contact.format,contact.timestamp ]);


    const result = validateForm(contact);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }
     

    res.render('confirm', { contact });
     
 });


app.get('/admin', async (req, res) => {

    //Connect to the database
    const conn = await connect();

    //Query the database
    const guestInfo = await conn.query('SELECT * FROM record')

    console.log(guestInfo);

    res.render('admin', { guestInfo });
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