const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocoding = require("./utils/geo")
const forecast = require("./utils/forecast")

const app = express()

const port = process.env.PORT || 8080

// Paths for express
const viewPaths = path.join(__dirname, "../templates/views")
const publicPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")

// Handles Bars setup
app.set("view engine", "hbs")
app.set("views", viewPaths)
hbs.registerPartials(partialsPath)

// Point express to static files
app.use(express.static(publicPath))

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Topher Aronson"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About",
        name: "Topher Aronson"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Topher Aronson"
    })
})

app.get('/weather', (req, res) => {
  
    if (!req.query.address) {
        return res.send({
            error: "No address submitted"
        })
    }

    geocoding(req.query.address, (error, { lat, long, location} = {}) => {

        if (error) {
            res.send(error)
        } else {
            
            forecast(lat, long, (error, { summary, temp, rain }) => {
                if (error) {
                    console.log(error)
                } else {
                    
                    res.send({
                        location: location,
                        sumary: summary,
                        temp: temp,
                        rain: rain
                    })
                }
            })
        }
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Page not found",
        name: "Topher Aronson"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})