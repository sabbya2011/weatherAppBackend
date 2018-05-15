const request = require('request');

var geocodeAddress = (address,callback)=>{
    const encodedAddress = encodeURIComponent(address);
    const google_map_key = "AIzaSyC7AH50bOmIffcz1IDeNtpIAFP34SHXQxs";
    const map_location_uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}/key=${google_map_key}`;
    request({
        url: map_location_uri,
        json: true
      }, (error, response, body) => {
        //console.log(JSON.stringify(body, undefined, 2));
        if(error){
          callback("Unable to connect to Google Server");
        }else if(body.status==="ZERO_RESULTS"){
          callback("Unable to Find the Address");
        }else if(body.status==="OVER_QUERY_LIMIT"){
            callback("Query Limit reached");
        }else if(body.status==="OK"){
            callback(undefined,{
               address: body.results[0].formatted_address,
               latitude: body.results[0].geometry.location.lat,
               longitude: body.results[0].geometry.location.lng
            });
        }
      });
};

module.exports.geocodeAddress = geocodeAddress;