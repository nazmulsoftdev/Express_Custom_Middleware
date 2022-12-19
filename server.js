const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const dashboardRouter = express(); // dashboard router

const WrapperMiddleware = (options) => {
    return function(req, res, next) {
        if (options.logs) {
            console.log(
                `Request Time: ${new Date().toLocaleString()} \t Method: ${req.method}`
            );
            next();
        } else {
            throw new Error("This is Middleware Error !");
        }
    };
};

dashboardRouter.use(WrapperMiddleware({ logs: true }));

dashboardRouter.get("/dashboard", (req, res) => {
    res.send("Welcome to Dashboard Page");
});

app.use("/admin", dashboardRouter);

app.get("/", (req, res) => {
    res.send("Express root Route");
});

// MiddleWare error

const DashboardMiddlewareError = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send("This is server side error");
};

dashboardRouter.use(DashboardMiddlewareError);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Express server is active on ${PORT}`);
});