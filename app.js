const buscar = document.querySelector("#buscar");
const address = document.querySelector("#address span");
const locacion = document.querySelector("#location span");
const timezone = document.querySelector("#timezone span");
const isp = document.querySelector("#isp span");
const input = document.querySelector("#form input");

var map = L.map('map', { zoomControl: false }).setView([34.04915, -118.09462], 13);
var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);

const json = async () => {
    let value = input.value;
    let peticion = await fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_XFThpTHF9dOlxRheY8da0Vq9PKYeb&ipAddress=${value}`);
    if (!peticion.ok) {
        alert("Ip ingresada no es correcta");
    } else {
        let resultado = await peticion.json();
        address.innerHTML = `${resultado.ip}`;
        locacion.innerHTML = `${resultado.location.country}, ${resultado.location.region}`;
        timezone.innerHTML = `UTC ${resultado.location.timezone}`;
        isp.innerHTML = `${resultado.isp}`;
        console.log(resultado);
        map.setView([resultado.location.lat, resultado.location.lng], 13);
        console.log(resultado)
    }




};
buscar.addEventListener("click", json);



