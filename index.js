const express = require("express");
const app = express();
const path = require("path");
const sassMiddleware = require('node-sass-middleware');


const port = 3000;

app.listen(port);
console.log('Server running on port ' + port);

var srcPath = __dirname + '/sass';
var destPath = __dirname + '/public';

app.use(sassMiddleware({
    /* Options */
    src: srcPath,
    dest: destPath,
    debug: true,
    outputStyle: 'compressed',
    // force: true,
    // prefix:  '/public'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets')));
app.use('/pages', express.static(path.join(__dirname, '/pages')));

// Note: you must place sass-middleware *before* `express.static` or else it will
// not work.
app.use(express.static(path.join(__dirname, 'public')));