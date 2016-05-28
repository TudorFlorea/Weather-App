$(document).ready(function() {
    var latitude, longitude, callString, response, openWeatherLink, apiKey, weatherId, isPressedDeg;
    
    apiKey = "&appid=8879d92e68e68dce535d0993921530ae";
    openWeatherLink = "http://api.openweathermap.org/data/2.5/weather?";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            callString = openWeatherLink + "lat=" + latitude + "&lon=" + longitude + apiKey;

            $("#changeDeg").hover(function() {
                $('#change').animate({  borderSpacing: 180 }, {
                    step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)'); 
                    $(this).css('-moz-transform','rotate('+now+'deg)');
                    $(this).css('transform','rotate('+now+'deg)');
                        },
                        duration:'slow'
                },'linear');
            }, function() {
                $('#change').animate({  borderSpacing: -180 }, {
                    step: function(now,fx) {
                    $(this).css('-webkit-transform','rotate('+now+'deg)'); 
                    $(this).css('-moz-transform','rotate('+now+'deg)');
                    $(this).css('transform','rotate('+now+'deg)');
                        },
                        duration:'slow'
                },'linear');
            });
                
            
            $.getJSON(callString).then(function(data) {

                response = JSON.stringify(data);
                $("#location").html(response);
                $("#city").html('<i class="fa fa-map-marker" aria-hidden="true">' + " " + data["name"] + " , " + data["sys"]["country"]);
                $("#description").html(data["weather"][0]["main"] + ", " + data["weather"][0]["description"]);
                $("#temp").html("<i class=\"wi wi-thermometer\"> " + (data["main"]["temp"] - 273).toFixed(1) + " " + "<i class=\"wi wi-celsius\"> ");
                
                isPressedDeg = true;
                $("#changeDeg").on("click", function() {
                    if(isPressedDeg){
                        isPressedDeg = false;
                        $("#temp").html("<i class=\"wi wi-thermometer\"> " + (1.8 * (data["main"]["temp"] - 273) + 32).toFixed(1) + " " + "<i class=\"wi wi-fahrenheit\"> ");
                    } else {
                        isPressedDeg = true;
                        $("#temp").html("<i class=\"wi wi-thermometer\"> " + (data["main"]["temp"] - 273).toFixed(1) + " " + "<i class=\"wi wi-celsius\"> ");
                    } 
                });
                
                weatherId = data["weather"][0]["id"];
                
                 $.getJSON("js/data.json").then(function(json) {
                    json = json.filter(function (val) {
          	            return (val.id == weatherId);
                    });
                    $("#icon").html(json[0]["icon"]);
                 });
            });
        });
    } else {
        $("#city").html('Please turn on your geolocation!');
    }
});
    
                                                 
