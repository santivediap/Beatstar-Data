const express = require('express');
const path = require('path');
require('dotenv').config()

const app = express();
app.use(express.json({ extended: false }));

// Routers
const genresApiRouter = require("./routes/genresRoutes")
const artistsApiRouter = require("./routes/artistsRoutes")
const songsApiRouter = require("./routes/songsRoutes")

app.use("/api/genres", genresApiRouter)
app.use("/api/artists", artistsApiRouter)
app.use("/api/songs", songsApiRouter)

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('../client/dist'));
    
    app.get('*', (req,res) => res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')));
  }

app.listen(PORT, () => console.log(`Server started port ${PORT}`));