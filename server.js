require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');

const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



// api routes

////Api Routes Employees
app.use('/employees', require('./Employees/employcontrol'));

//Api Routes Users
app.use('/users', require('./Users/UsersControl'));


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 6066;
app.listen(port, () => console.log('Server listening on port ' + port));