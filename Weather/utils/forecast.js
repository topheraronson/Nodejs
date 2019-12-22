const request = require('request')

const forecast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/26ea67aafbb1057ba56dc54d4f4afab8/" + lat + "," + long

    request( { url: url, json: true}, (error, response) => {

        if (error) {
            callback("Unable to connect to weather services.", null)
        } else if (response.body.error) {
            callback("Unable to get forecast for that location.")
        } else {

            const data = {
                summary: response.body.daily.data[0].summary,
                temp: response.body.currently.temperature,
                rain: response.body.currently.precipProbability
            }

            callback(null, data)
        }
    })
}

module.exports = forecast