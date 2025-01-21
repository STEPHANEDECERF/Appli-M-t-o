let city = 'havre'
const urlParams = new URLSearchParams(window.location.search);
city = urlParams.get(`city`)

if (city == null || city == "") {
  city = `havre`
}


//  clè API
const apikey = "32d35220e71dd0567e129e5369b9f0f8"

//  ville par defaut


//  url permettant d'obtenir les previsions meteo
let url = `https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=${city}&appid=${apikey}`

// on va chercher les infos de l'url
fetch(url)
  .then(response => response.json())
  .then(data => {

    // heure lever
    let sunrise = new Date(data.city.sunrise * 1000)
    console.log(moment(sunrise).locale("fr").format("LT"))

    // heure coucher
    let sunset = new Date(data.city.sunset * 1000)
    console.log(moment(sunset).locale("fr").format("LT")) 


    if (data.cod == 404) {
      document.getElementById('notfound').classList.remove('visually-hidden')
    } else {
      console.log("");
      
      document.getElementById('notfound').classList.add('visually-hidden')
      document.querySelector("#interface").innerHTML = `
 <div class="text-white">
      <p class="fs-3 mt-2 text-center fw-bold">${data.city.name}</p>
      <p class="fs-6 mt-2 text-center">Dernière Mise à Jour: ${moment(data.list[0].dt_txt).locale("fr").format("LLLL")}</p>
      <div class="text-center">
        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="">
      </div>
      <p class="text-center">${data.list[0].weather[0].description}</p>
      <p class="text-center">Humidité : ${data.list[0].main.humidity}% / Vent : ${(data.list[0].wind.speed * 3.6).toPrecision(2)}km/h</p>
      <p class="text-center"><i class="bi bi-brightness-high me-1"></i>${moment(sunrise).locale("fr").format("LT")} <i
          class="bi bi-moon-fill ms-3 me-1"></i>${moment(sunset).locale("fr").format("LT")}</p>
      <p class="text-center">${data.list[0].main.temp}°C</p>
      <p class="text-center">Min ${data.list[0].main.temp_min}°c / Max ${data.list[0].main.temp_max}°C</p>
    </div>
`
      // PREVISIONS 5 jours

      for (let i = 0; i < data.list.length; i++) {
        if (moment(data.list[i].dt_txt).locale("fr").format('LTS')  == "12:00:00") {
          document.getElementById("next5days").innerHTML += `
                      <div class="card col-4 col-lg-2 colorcard shadow-md">
                            <div class="card-body text-center">
                              <h5 class="card-title ">${moment(data.list[i].dt_txt).locale("fr").format("Do MMM")}</h5>
                              <div class="d-flex justify-content-center">
                              <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="" class="">
                            </div>
                              <p class="text-center">${data.list[i].main.temp}°C</p>
                              <p class="text-center minmaxcard">Min ${data.list[i].main.temp_min} °c / Max ${data.list[i].main.temp_max} °C</p>
                            </div>
                          </div>
                      `
        }

      }










    }


  })