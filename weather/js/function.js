/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */
//Testing Variables
//const temp = 41;
//const speed = 5;
//const direction = "NE";
//const elevation = 1501;
//let condition = "snow";

getGeoLocation();


//Current Conditions
function getCondition(condition) {
    //Changes natural language into proper weather things
    //Clear Conditions
    condition = condition.toLowerCase();
    if (condition.includes("clear") || condition.includes("sun") || condition.includes("nice")) {
        return "Clear";
    } else
        //Cloud Conditions
        if (condition.includes("cloud") || condition.includes("overcast")) {
            return "Cloudy";
        } else
        //Fog Conditions
        /*fog, haze, mist, smog; foggy, hazy, misty, smoggy; dew; dewy; thick fog; dense fog; heavy fog; patchy fog; a blanket of fog.*/
            if (condition.includes("fog") || condition.includes("haze") || condition.includes("mist") || condition.includes("dew")) {
                return "Fog";
                } else
        //Rain Conditions
    if (condition.includes("wet") || condition.includes("rain") || condition.includes("thunder") || condition.includes("lightning")) {
        return "Rain";
    } else
        //Snow Conditions
        /*heavy snow; deep snow; fresh snow; light snow; wet snow; falling snow; melting snow; snow, snowfall, snowstorm, blizzard, frost; thaw; slippery roads; snowflake, snowdrift, snowbank; ice, icicle.*/
        if (condition.includes("snow") || condition.includes("blizzard") || condition.includes("frost") || condition.includes("ice")) {
            return "Snow";
        }
}
//Summary Image
function changeSummaryImage(weather) {
    //Change the picture of the current weather to match conditions
    //const curWeather = document.getElementById('curWeather');
    switch(weather) {
        case Clear: curWeather.setAttribute('class', 'clear')
            break;
        case Cloudy: curWeather.setAttribute('class', 'cloud')
            break;
        case Fog: curWeather.setAttribute('class', 'fog')
            break;
        case Rain: curWeather.setAttribute('class', 'rain')
            break;
        case Snow: curWeather.setAttribute('class', 'snow')
            break;
    }
}

//Wind Chill
function buildWC(speed, temp) {
    //const feelTemp = document.getElementById('feelTemp');

    //Compute the wind chill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    //Round the answer down to integer
    wc = Math.floor(wc);

    //If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    //Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}

//Wind Dial Function
function windDial(direction) {
    const dial = document.getElementById("dial")
    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "north"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "south");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "east");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "west");
            break;
    }
}

//round(temp);
//console.log(temp);
//convertMeters(elevation);


//round currentTemp
function round(temp) {
    let x = Math.round(temp);
    console.log(x)
    return x;
}

//convert meters to feet
function convertMeters(meters) {
    console.log(meters);
    let feet = Math.round(meters * 3.28084);
    console.log(feet);
    return feet;
}

/**********************************************
******** WEATHER UNDERGROUND API STUFF ********
**********************************************/
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
            STATUS.setAttribute("id", "found");
        })
    } else {
        STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
    } // end else
} //end getGeolocation
// Get Data from API
function getData(LOCALE) {
    const WU_API_KEY = '4e87d57e62b8d87a';
    const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/conditions/forecast/hourly/q/" + LOCALE + ".json";
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
        console.log('Json object from getData function:');
        console.log(data);
        displayData(data);
    })
        .catch(error => console.log('There was an error: ', error))
} // end getData function

function displayData(data) {
    // Get data out of object
    //location Info
    let locationName = data.current_observation.display_location.full;
    let zip = data.current_observation.display_location.zip;
    let elevation = data.current_observation.display_location.elevation;
    let latitude = data.current_observation.display_location.latitude;
    let longitude = data.current_observation.display_location.longitude;


    //conditions
    let condition = data.current_observation.weather;
    let forecastImage = data.current_observation.icon_url;

    //Temperature
    let temp = data.current_observation.temp_f;
    let tempHigh = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    let tempLow = data.forecast.simpleforecast.forecastday[0].low.fahrenheit;
    console.log("Temp: current, Hi, Lo", temp, tempHigh, tempLow);

    //Wind
    let speed = data.current_observation.wind_mph;
    let direction = data.current_observation.wind_dir;
    let gust = data.current_observation.wind_gust_mph;
    console.log("Wind: Speed, direction, gust", speed, direction, gust);

    //WUnderground Logo TEMP: TODO create responsive image
    let creditImg = data.current_observation.image.url;

    //Derived Values
    let weather = getCondition(condition);
    console.log("Weather ", weather);
    //**Modify data to display into HTML
    buildWC(speed, temp);
    windDial(direction);
    console.log(weather);


    console.log("");

    //get data into HTML
    //Location Information
    const TITLE = document.getElementById("title");
    TITLE.innerHTML = locationName + " | Weather Site";
    const PAGE_TITLE = document.getElementById("pagetitle");
    PAGE_TITLE.innerHTML = locationName;
    const ZIP = document.getElementById("zip");
    ZIP.innerHTML = zip;
    const ELEVATION = document.getElementById("elevation");
    ELEVATION.innerHTML = Math.round(convertMeters(elevation));
    const LAT = document.getElementById("latitude");
    LAT.innerHTML = latitude;
    const LONG = document.getElementById("longitude");
    LONG.innerHTML = longitude;

    //Conditions
    //**Current condition complete in Derived Values
    const FC_HEAD = document.getElementById("video-header");
    FC_HEAD.innerHTML = weather;
    const FC_IMG = document.getElementById("videoimage");
    FC_IMG.src = forecastImage;
    //Temperature
    const TEMP = document.getElementById("currentTemp");
    TEMP.innerHTML = Math.round(temp) + "&deg;F";
    const TEMP_HIGH = document.getElementById("high");
    TEMP_HIGH.innerHTML = tempHigh + "&deg;F";
    const TEMP_LOW = document.getElementById("low");
    TEMP_LOW.innerHTML = tempLow + "&deg;F";
    //**Feels-like temp AKA wind chill in Derived Values
    //Wind
    const WIND_SPEED = document.getElementById("wind-speed");
    WIND_SPEED.innerHTML = speed + " mph";
    const WIND_DIR = document.getElementById("wind-dir");
    WIND_DIR.innerHTML = "Direction: " + direction;
    const WIND_GUST = document.getElementById("wind-gust");
    WIND_GUST.innerHTML = "Gusts: " + gust + " mph";
    //Courtesy of:
    const CREDIT_IMG = document.getElementById("credit-img");
    CREDIT_IMG.src = creditImg;

    //show the data to the user
    const HIDE = document.getElementById("main");
    HIDE.setAttribute("class", "show");
}
