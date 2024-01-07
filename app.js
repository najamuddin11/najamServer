var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");

const port = process.env.PORT || 5000;

const app = express();
const whitelist = [
  "https://najam.vercel.app",
  "https://najam.in",
  "https://najamuddin11.github.io",
];

var corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.text({ limit: "200mb" }));

app.use(express.json({ limit: "200mb" }));

app.use(
  express.urlencoded({
    extended: false,
    parameterLimit: 90000000,
    limit: "200mb",
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (whitelist.includes(req.headers.origin)) {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  }
  // Set to true if you need the website to include cookies in the requests sent

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,set-cookie,x-xsrf-token,x-csrf-token,CSRF-Token,XSRF-TOKEN,Accept,Access-Control-Allow-Origin"
  );

  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

var csrfProtection = csrf({ cookie: true });

app.use((req, res, next) => {
  csrfProtection(req, res, next);
});
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), {
    sameSite: "Strict",
    secure: true,
  });
  next();
});
const main = require("./routes/main/main");

app.use("/api/", main);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
