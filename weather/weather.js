const request = require("request");
const dark_sky_api_key = "da4aeb4afdd15f74998e838370ab6714";

getWeather = (lat,lng,callback)=>{
    request({
        url:`https://api.darksky.net/forecast/${dark_sky_api_key}/${lat},${lng}`,
        json:true    
    },(error,response,body)=>{
        if(error){
            callback(error);
        }else if(response.statusCode=== 404){
            callback("Sorry weather for the given location not found");
        }
        else if(response.statusCode === 200){
            callback(undefined,{
                temperature:body.currently.temperature,
                apparentTemperature:body.currently.apparentTemperature
            });
        }
    })
}

module.exports.getWeather = getWeather; 
