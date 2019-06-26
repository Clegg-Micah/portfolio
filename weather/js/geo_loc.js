/* Works with loctest to get weather information for current location and populate web page with the data.*/
'use strict';
//call function to get location
getGeoLocation();





/*Get current location using lattitude and longitude*/
function getGeoLocation() {
    const STATUS = document.getElementById('status');
    STATUS.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const LAT = position.coords.latitude;
            const LONG = position.coords.longitude;

            // Combine the values
            const LOCALE = LAT + "," + LONG;
            console.log(`Lat and Long are: ${LOCALE}.`);

            // Call getData function, send locale
            getData(LOCALE);
        })
    } else {
        STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
    } // end else
} //end getGeolocation

//// Get Data from API
//function getData(LOCALE) {
//    const WU_API_KEY = '4e87d57e62b8d87a';
//    const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/conditions/q/" + LOCALE + ".json";
//    fetch(URL)
//        .then(response => response.json())
//        .then(function (data) {
//        console.log('Json object from getData function:');
//        console.log(data);
//        displayData(data);
//    })
//        .catch(error => console.log('There was an error: ', error))
//} // end getData function
