const express = require('express');
const cors = require('cors');



const app = express()


app.use(express.json())


app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))


app.use(express.static('public'));

//Routes
const botRoutes = require('./routes/botRoutes');





app.use('/bot', botRoutes)


app.listen(5001);



