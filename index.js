const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to db
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to DB!');
	}
);

// Body parser middleware
app.use(express.json());
// Route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(5000 || process.env.PORT, () => console.log('Server is running...'));
