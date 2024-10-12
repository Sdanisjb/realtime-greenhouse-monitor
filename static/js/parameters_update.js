// Configure Pusher instance
const pusher = new Pusher("7bcef49942abe5d0aee5", {
  cluster: "sa1",
  encrypted: true,
});

// Subscribe to poll trigger
var parametersChannel = pusher.subscribe("parameters");
var resetChannel = pusher.subscribe("reset_channel");

// Listen to 'order placed' event
var phMeasure = document.getElementById("ph-measure");
var temperatureMeasure = document.getElementById("temperature-measure");
var humidityMeasure = document.getElementById("humidity-measure");
var luminosityMeasure = document.getElementById("luminosity-measure");
var waterLevelMeasure = document.getElementById("water-level-measure");
parametersChannel.bind("update", function (data) {
  phMeasure.innerText = parseFloat(data.ph);
  temperatureMeasure.innerText = parseFloat(data.temperature);
  humidityMeasure.innerText = parseFloat(data.humidity);
  luminosityMeasure.innerText = parseFloat(data.luminosity);
  waterLevelMeasure.innerText = parseFloat(data.water_level);
});

const reset = (e) => {
  fetch("https://ukuku.pythonanywhere.com/reset", { method: "POST" });
};
