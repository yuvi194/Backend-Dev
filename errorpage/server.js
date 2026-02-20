import express from 'express';
const app = express();
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.send('Home Page. Try visiting a non-existent page to see the custom 404 error.');
});

app.use((req, res) => {
    res.status(404).render('error');
});

app.listen(3000, () => {
    console.log(`Server running`);
});