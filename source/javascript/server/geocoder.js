var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

var geocoderProvider = 'google';
var httpAdapter = 'https';
// optionnal 
var extra = {
    apiKey: 'AIzaSyDDcReNxUgzw-WFMEvp3Pj7tTPZD6gyZGs', // for Mapquest, OpenCage, Google Premier 
    formatter: null         // 'gpx', 'string', ... 
};
 
export default geocoder;
/*
export function geoCodeAddress(str){

	return new Promise((resolve, reject) => {
    geocoder.geocode('arak iran', function(err, res) {
    	console.log(res);
    	if(err){
    		reject(err);
    	}else{
    		resolve(res);
    	}
		}); 	
  });

	// Using callback 
	
 }*/
