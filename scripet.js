// ✅ Replace with your own API key from https://openweathermap.org/
 const API_KEY = "e63fa5ec6467a0fbfd4ec5c08c33b106";
    const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
  

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherCard");

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found!");
    const data = await res.json();
    showWeather(data);
  } catch (err) {
    alert(err.message);
  }
}

function showWeather(data) {
  const name = data.name + ", " + data.sys.country;
  const condition = data.weather[0].description;
  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const wind = (data.wind.speed * 3.6).toFixed(1); // km/h
  const visibility = (data.visibility / 1000).toFixed(1);
  const uv = Math.floor(Math.random() * 8); // dummy UV

  document.getElementById("cityName").textContent = name;
  document.getElementById("condition").textContent = condition;
  document.getElementById("temp").textContent = `${temp}°C`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("wind").textContent = `${wind} km/h`;
  document.getElementById("uv").textContent = uv;
  document.getElementById("visibility").textContent = `${visibility} km`;

  weatherCard.classList.add("show");
  weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather();
});
