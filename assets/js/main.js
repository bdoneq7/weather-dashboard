var citysearches = [];

var citySearchEl=document.querySelector("#city-search");
var cityEl=document.querySelector("#city");
var currentWeatherEl=document.querySelector("#current-weather");
var citySearchEl = document.querySelector("#city-search");


var citySearchForm = function(event){
    
    var city = cityEl.value.trim();
    if(city){
        retrieveCityWeather(city);
        citysearches.unshift({city});
        cityEl.value = "";
    } else{
        console.log("redirect to homepage");
    }
    localStorage.setItem("citysearches", JSON.stringify(citysearches));
    
};

var retrieveCityWeather = function(city){
    
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=23490a99fb08838927ee6b3f63514da6"

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};