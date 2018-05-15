const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const argv = yargs
  .options({
    address:{
      alias:'a',
      demand:true,
      describe:'provide the address for the weather app',
      string:true
    }
  })
  .help()
  .alias('help','h')
  .argv;
geocode.geocodeAddress(argv.address,(errorMsg,result)=>{
  if(errorMsg){
    console.log(`Error Message is ${errorMsg}`);
  }else{
    weather.getWeather(result.latitude,result.longitude,(errorMsg,weatherData)=>{
      if(errorMsg){
        console.log(`Error Message is ${errorMsg}`);
      }else{
        console.log(`current Temperature: ${weatherData.temperature}°F at ${result.address} but feels like ${weatherData.apparentTemperature}°F`);
      }
    })
  }
});
