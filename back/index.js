const express = require("express");
const userRouter = require("./routes/user.routes");
const masterRouter = require('./routes/master.router')
const organizerRouter = require("./routes/organizer.router")
const eventRouter = require("./routes/event.router")
const reqestRouter = require("./routes/request.router")
const invetationRouter = require("./routes/invetation.router")
const productRouter = require("./routes/product.router")
const masterEventRouter = require('./routes/masterEvent.router')
const favouriteEventRouter = require("./routes/favouriteEvent.router")
const favouriteMasterRouter = require("./routes/favouriteMaster.router")
const loginRouter = require("./routes/login.router")
const app = express();

app.use(express.json());
app.use("/auth", loginRouter)
app.use("/api", userRouter);
app.use("/api", masterRouter);
app.use("/api", organizerRouter);
app.use("/api", eventRouter);
app.use("/api", reqestRouter);
app.use("/api", invetationRouter);
app.use("/api", productRouter);
app.use("/api", masterEventRouter);
app.use("/api", favouriteEventRouter);
app.use("/api", favouriteMasterRouter);

app.listen(3000, () => console.log("Server started"));
