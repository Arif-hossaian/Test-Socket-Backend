const express = require('express');
const http = require('http');
const cors = require('cors');

const pool = require('./config/db');
const setupSocket = require('./config/socketConfigSetup');
const serviceRoutes = require('./routes/serviceRoute');
const notificationRoutes = require('./routes/notificationRoute');

const launchRoutes = require('./routes/launch/launchRoutes');
const userRoutes = require('./routes/user/userRoutes');



const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Database Test
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected successfully:', res.rows[0].now);
  }
});

// API Routes
app.use('/api/notifications', notificationRoutes);

app.use('/api', serviceRoutes);


app.use('/api/launche', launchRoutes);
app.use('/api/user', userRoutes);



// Setup Socket.IO
const io = setupSocket(server);
app.set('socketio', io);

// Start Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
