let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

//assiging the copied API key to the 'key' variable

key = "b763292210910e1777fa153dd3e720cd";


//function to fetch weather details from api and display them


let getWeather = () => {
    let cityValue = cityRef.value;
    //if input field is empty
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class = "msg">Please enter a city name</h3>`;
    }
    else {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
        //clear the input field
        cityRef.value = "";
        fetch(url)
            .then((resp) => resp.json())
            //if city name is valid
            .then((data) => {
                // console.log(data);
                // console.log(data.weather[0].icon);
                // console.log(data.weather[0].main);
                // console.log(data.weather[0].description);
                // console.log(data.name);
                // console.log(data.main);
                // console.log(data.main.temp_min);
                // console.log(data.main.temp_max);

                result.innerHTML = `
            <h2>${data.name}</h2>
            <h4 class = "weather">${data.weather[0].main}</h4>
            <h4 class = "desc">${data.weather[0].description}</h4>
            <img src ="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
            <h1>${data.main.temp} &#176;</h1>
            <div class = "temp-container">
                <div>
                    <h4 class = "title">min</h4>
                    <h4 class = "temp">${data.main.temp_min}</h4>
                </div>
                <div>
                    <h4 class = "title">max</h4>
                    <h4 class = "temp">${data.main.temp_max}</h4>
                </div>
            </div> 
            `;
            })
            //if invalid city name entered
            .catch(() => {
                result.innerHTML = `<h3 class = "msg">City not found</h3>`;
            });
    }

};

//event listener for search button
searchBtn.addEventListener("click", getWeather);

//event listener for enter key
cityRef.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

//load weather data on page load
window.addEventListener("load", getWeather);