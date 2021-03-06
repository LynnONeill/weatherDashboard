window.onload = function () {
    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast/?q=";
    let urlWeather = "https://api.openweathermap.org/data/2.5/weather/?q=";
    let urlUV = "https://api.openweathermap.org/data/2.5/uvi?";
    let apiKey = "&units=imperial&appid=789c3f277eab1cde016283c655a70824";

    let city = $("#citySearch").val().trim();
    let cityArray = [];


    // When search button is clicked: search city is added to local storage,

    $("#search").on("click", function (event) {
        event.preventDefault();

        let city = $("#citySearch").val().trim();
        cityArray.push(city);
        localStorage.setItem("cities", JSON.stringify(cityArray));

        // appending search history buttons to searchHistory div //
        $("#searchHistory").append("<div class = 'searchHistoryButton' data-value = '" + city + "'> " + city + "</div>");
        // this unbind function prevents the search history from stacking //
        $(".searchHistoryButton").unbind("click");

        // when one of the previous city search buttons is clicked it will initiate the city current weather conditions and the forcast for that city //
        $(".searchHistoryButton").on("click", function () {
            let city = $(this).attr("data-value");
            search(city);
        })

        search(city);
    })
    // This function will call cities from local storage to search history after page has been refreshed
    function callCities() {

        let newCityArray = JSON.parse(localStorage.getItem("cities"));
        for (let i = 0; i < newCityArray.length; i++) {
            $("#searchHistory").append("<div class = 'searchHistoryButton' data-value = '" + newCityArray[i] + "'> " + newCityArray[i] + "</div>");
        }
        $(".searchHistoryButton").on("click", function () {
            let city = $(this).attr("data-value");
            search(city);
        })
    }
    callCities();

    // This is the function that uses user input (city) to pull weather and forcast data //
    function search(city) {
        // we want to empty the original city searches first so that the results don't stack //
        $("#cityDetails").empty();
        $("#forcast").empty();

        // api call for current weather conditions //
        $.ajax({
            url: urlWeather + city + apiKey,
            method: "GET"
        }).then(function (weather) {
            console.log(weather);
            let newDate = $("<h3>").text(weather.name + " (" + moment().format("L") + ")");
            let temperature = $("<p>").text("Temperature: " + weather.main.temp.toFixed(1) + String.fromCharCode(176) + "" + " F");
            let humidity = $("<p>").text("Humidity:  " + weather.main.humidity + "  %");
            let windSpeed = $("<p>").text("Wind Speed:  " + weather.wind.speed + " MPH");
            let uvIndex = $("<p>").text("UV Index:  ")
            let curWeatherIcon = $("<img>")
            curWeatherIcon.attr("src", "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png");

            let cor = "lat=" + weather.coord.lat + "&lon=" + weather.coord.lon;
            let uvApi = "&appid=789c3f277eab1cde016283c655a70824";

            $.ajax({
                url: urlUV + cor + apiKey,
                method: "GET"
            }).then(function (UV) {
                let index = $("<p>").text("UV Index: " + UV.value);
                $("#cityDetails").append(index);
            })

            $("#cityDetails").append(newDate, curWeatherIcon, temperature, humidity, windSpeed);
        })

        // api call for weather forcast //
        $.ajax({
            url: urlForecast + city + apiKey,
            method: "GET"
        }).then(function (forcast) {
            for (i = 4; i < 40; i += 8) {
                let forDate = forcast.list[i].dt_txt;
                let formattedDate = $("<p>").text(moment(forDate, "YYYY-MM-DD").format("MM/DD/YYYY"));

                let currentIcon = forcast.list[i].weather[0].icon;
                let icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + currentIcon + ".png");
                let forTemp = forcast.list[i].main.temp;
                let formattedTemp = $("<p>").text("Temp:  " + forTemp.toFixed(1) + String.fromCharCode(176) + "" + " F");
                let forHum = $("<p>").text("Humidity:  " + forcast.list[i].main.humidity + "%");

                let dayContainer = $("<div>").addClass("dayContainer");

                $("#forcast").append(dayContainer);

                dayContainer.append(formattedDate, icon, formattedTemp, forHum);

            }
        })
    }
}
