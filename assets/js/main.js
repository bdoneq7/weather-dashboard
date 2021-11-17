var getUserCity = function() {
    console.log("function was called");

    // Open Weather Map api url
    // reference 6.1.6
    var response = fetch("api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8ae55ceca5827c1c46c002c58abf5277").then(function(response){
        
        response.json().then(function(data){
            console.log(data);
        })
    })
    console.log(response);
};

getUserCity();