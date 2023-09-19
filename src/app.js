const express = require('express')
const cookieParser = require('cookie-parser')
const session = require ('express-session')
const fileStore = require ('session-file-store')
const mongoStore = require ('connect-mongo')
const handlebars = require('express-handlebars')
const sessionRouter = require ('./routes/sessions')
const viewRouter = require ('./routes/views')

const app = express()
const port = 8085

app.use(express.urlencoded({extended: true}))

const fileStorage = fileStore(session)
app.use (cookieParser())
app.use (session({
    store: mongoStore.create({
    mongoUrl: "mongodb+srv://nehuengiannone:Lz7n3cS0vO7ulfvk@cluster0.s1deur4.mongodb.net/?retryWrites=true&w=majority",
    mongoOptions: {useNewUrlParser: true,  useUnifiedTopology: true },
    ttl: 5000 }),
    secret: "secretCoder",
    resave: false,
    saveUninitialized: true
}))
app.engine ("handlebars", handlebars.engine())
app.set("views",__dirname + "/views")
app.set("view engine", "handlebars")

app.use("/api/sessions", sessionRouter)
app.use("/", viewRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})