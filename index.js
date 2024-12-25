var flash = require("express-flash");
const express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
//import file sys tem from config()
const systemConfig = require("./config/system");
// import file connect Database from File config();
const database = require("./config/connect_data");
// import file Router Admin and Client from router
const router = require("./router/client/index");
const routerAdmin = require("./router/admin/index_router");
// Call back function connect() to connect Database
database.connect();

const app = express();

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
const port  = process.env.PORT|| 3000;
app.use(methodOverride("_method"));
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// Router
router(app);
routerAdmin(app);

app.listen(port, () => {
  console.log(`Server is running on port${port} `);
});
