// Bring in path, express, controllers, express session, handlebars, sequelize, and helpers
const path = require("path");
const express = require("express")
const routes = require("./controllers");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require('./utils/helpers');

// Define variables for using express and server
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const sess = {
  secret: "Shhhhhhh",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Middleware
app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(routes);

// connect to server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
