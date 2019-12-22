const request = require('request')

const geocoding = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +".json?access_token=pk.eyJ1IjoidG9waGVyYXJvbnNvbiIsImEiOiJjazRlbXBkNDgwZmN2M2Vub2lvMnEycHZwIn0.cBP2ZlntaxOweZDjniNQrw"

    request({url: url, json: true}, (error, response) => {
        if (error) {
            err = "Unable to reach geo service"
            callback(err, null)
        } else if (response.body.features.length === 0) {
            err = "Unable to convert loaction to geocords"
            callback(err, null)
        } else {
            const long = response.body.features[0].center[0]
            const lat = response.body.features[0].center[1]
            const location = response.body.features[0].place_name

            const data = {
                lat: lat,
                long: long,
                location: location
            }

            callback(null, data)
        }
    })
}

module.exports = geocoding