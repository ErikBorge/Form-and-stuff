const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
// const favicon = require('express-favicon');
const port = process.env.PORT || 3000;

//favicon
// app.use(favicon(__dirname + '/build/favicon.ico'));

app.use(express.static(publicPath));
app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
   console.log('Server is up!');
});
