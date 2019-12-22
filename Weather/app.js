const geocoding = require('./utils/geo')
const forecast = require('./utils/forecast')

require('yargs')
  .scriptName("weather-forecast")
  .usage('$0 <cmd> [args]')
  .command('location [address]', 'Fetch weather for location', (yargs) => {
    yargs.positional('address', {
      type: 'string',
      default: 'Seattle',
      describe: 'Location to fetch forecast for'
    })
  }, function (argv) {

    geocoding(argv.address, (error, data) => {

        if (error) {
            console.log(error)
        } else {
            
            forecast(data.lat, data.long, (error, data) => {
                if(error) {
                    console.log(error)
                } else {
                    console.log('Data', data)
                }
              })
        }
    })
    
  })
  .help()
  .argv