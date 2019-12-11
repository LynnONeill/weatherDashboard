window.onload = function () {
    let urlForecast = "http://api.openweathermap.org/data/2.5/forecast/?q=";
    let urlWeather = "http://api.openweathermap.org/data/2.5/weather/?q=";
    let city = $("#citySearch")
        .val()
        .trim();
    let apiKey = "&units=imperial&appid=789c3f277eab1cde016283c655a70824";
    let urlFullWeather = urlWeather + city + apiKey;
    let urlFullForecast = urlForecast + city + apiKey;
    let curDate =



        $("#search").on("click", function (event) {
            event.preventDefault();
            let city = $("#citySearch")
                .val()
                .trim();
           
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather/?q=" + city + "&units=imperial&appid=789c3f277eab1cde016283c655a70824",
                method: "GET"
            }).then(function (response) {
                console.log(response);
                let newDate = $("<h3>").text(response.name + " (" + moment().format("L") + ")");
                let temperature = $("<p>").text("Temperature: " + response.main.temp + String.fromCharCode(176) + "" + "F");
                let humidity = $("<p>").text("Humidity:  " + response.main.humidity + "  %");
                let windSpeed = $("<p>").text("Wind Speed:  " + response.wind.speed + " MPH");
                let uvIndex = $("<p>").text("UV Index:  ")
                let curWeatherIcon = $("<img>")
                curWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

                $("#cityDetails").append(newDate, curWeatherIcon, temperature, humidity, windSpeed, uvIndex);




            })

        })



}
