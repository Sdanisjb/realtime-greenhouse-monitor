// Configure Pusher instance
const pusher = new Pusher("7bcef49942abe5d0aee5", {
  cluster: "sa1",
  encrypted: true,
});

// Subscribe to poll trigger
var parametersChannel = pusher.subscribe("parameters");

// Listen to 'order placed' event
var phMeasure = document.getElementById("ph-measure");
var temperatureMeasure = document.getElementById("temperature-measure");
var humidityMeasure = document.getElementById("humidity-measure");
var luminosityMeasure = document.getElementById("luminosity-measure");
var waterLevelMeasure = document.getElementById("water-level-measure");
parametersChannel.bind("update", function (data) {
  phMeasure.innerText = parseInt(data.ph);
  temperatureMeasure.innerText = parseInt(data.temperature);
  humidityMeasure.innerText = parseInt(data.humidity);
  luminosityMeasure.innerText = parseInt(data.luminosity);
  waterLevelMeasure.innerText = parseInt(data.water_level);
});
