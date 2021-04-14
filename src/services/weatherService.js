export async function getWeather() {
  const data = await fetch("http://localhost:8080/weather/custom");
  const weatherData = await data.json();
  return weatherData;
}
