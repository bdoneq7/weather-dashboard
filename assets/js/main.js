function weatherDashboard() {
    var cityInputEl = document.getElementById("city-search");
    var searchButtonEl = document.getElementById("button-search");
    var clearHistoryEl = document.getElementById("history-clear");
    var cityNameEl = document.getElementById("city-name");
    var cityPictureEl = document.getElementById("city-picture");
    var cityTempEl = document.getElementById("city-temp");
    var cityHumidityEl = document.getElementById("city-humidity");
    var cityWindSpeedEl = document.getElementById("city-wind-speed");
    var cityUVIndexEl = document.getElementById("city-uv-index");
    var citySearchHistoryEl = document.getElementById("city-search-history");
    //var cityFiveDayEl = document.getElementById("city-five-day");

    var APIKey = "23490a99fb08838927ee6b3f63514da6";

    function retrieveCityWeather (cityInputEl) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + APIKey;
        
        // make a request to the url
    fetch(apiUrl).then(function(response) {
        
        // if City Name found, pass that data to DisplayCity
        // if no City Name found, alert error message
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayCity(data);
        });

    } else {
        alert("City Not Found!");
    }
        
    })

    .catch(function(error) {

        // handle network connection errors
        // notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to Open Weather");
    });

    };

    function displayCity(data) {
        cityNameEl.innerHTML = data.name;
        var cityWeatherImg = data.weather[0].icon;
        //cityWeatherImgEl.setAttribute("src","https://openweathermap.org/img/wn/" + cityWeatherImg);
        cityTempEl.innerHTML = "Temperature: " + data.main.temp + " &#176F";
        cityHumidityEl.innerHTML = "Humidity: " + data.main.humidity + "%";
        cityWindSpeedEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
        //cityFiveDayEl.innerHTML = "5-Day Forecast";

        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
        var apiUrlUV = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey;
        
        fetch(apiUrlUV).then(function(response) {
        
            // if UV Index Found, Display
            if (response.ok) {
                response.json().then(function(dataUV) {
                    console.log(dataUV);
                    var UVIndex = document.createElement("p");
                    UVIndex.setAttribute("class","badge badge-danger");
                    UVIndex.innerHTML = dataUV[0].value;
                    cityUVIndexEl.innerHTML = "UV Index: ";
                    cityUVIndexEl.append(UVIndex);
            });
    
        } else {
            alert("UV Index Not Found!");
        }
            
        })
    };

    searchButtonEl.addEventListener("click", function() {
        var searchTerm = cityInputEl.value;
        retrieveCityWeather(searchTerm);
    });

};

weatherDashboard ();

