const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

require('dotenv').config({ path : `./test.env` });

const { routeHandler } = require('./middlewares/routeHandler');
const { errorHandler } = require('./middlewares/errorHandler');
const { connectToDb } = require('./db/db.connect');

const userRouter = require('./routes/user.route')
const noteRouter = require('./routes/note.route');

app.use(bodyParser.json());
app.use(cors());

connectToDb();

app.get('/', (req, res) => {
  res.send('Welcome to Keep My Notes API')
})

app.use('/user', userRouter);
app.use('/note', noteRouter);

// ERROR HANDLER
app.use(errorHandler);

// ROUTE HANDLER
app.use(routeHandler);

app.listen(process.env.PORT, () => {
  console.log('Keep My Notes Backend has Started!');
});