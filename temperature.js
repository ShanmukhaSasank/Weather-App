const apiKey = "06090cb32ea407d67bc04b14b5dd23bb";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data = await response.json();


        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed +" Km/h";

        temperature = data.main.temp;
        (temperature <= 0) ? weatherIcon.src = "images/snow.png" : (temperature>40 ? weatherIcon.src = "images/clear.png" : "images/"+data.weather[0].main.toLowerCase()+".png");

        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
    }console.log(data);

}
searchBtn.addEventListener("click", ()=>{
    checkWeather (searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        checkWeather(searchBox.value);
    }
});