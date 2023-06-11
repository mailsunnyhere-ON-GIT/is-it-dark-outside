if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
}


 
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then(response => response.json())
    .then(data => {
      const countryName = data.countryName;
      document.getElementById("location").innerHTML = `Country: ${countryName}`;

      getSunsetTime(countryName)
        .then(sunsetTime => {
          console.log(`Sunset time: ${sunsetTime}`);
          checkBrightness(sunsetTime);
        });
    });
}


function checkBrightness(sunsetTime) {
  const currentTime = new Date();
  const sunset = new Date(sunsetTime);

  const currentHours = currentTime.getHours();
  const sunsetHours = sunset.getHours();

  if (currentHours >= sunsetHours) {
    document.getElementById("result").innerHTML = "No";
  } else {
    document.getElementById("result").innerHTML = "Yes";
  }
}

function updateTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  document.getElementById("time").innerHTML = `Time: ${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);

const openWeatherMapApiKey = '9f9ebc3a161019ad048036991286e4b9';

function getSunsetTime(country) {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9f9ebc3a161019ad048036991286e4b9`)
    .then(response => response.json())
    .then(data => {
      const sunsetTimestamp = data.sys.sunset;
      const sunsetDate = new Date(sunsetTimestamp * 1000);
      const sunsetTime = sunsetDate.toLocaleTimeString();
      return sunsetTime;
    });
}
