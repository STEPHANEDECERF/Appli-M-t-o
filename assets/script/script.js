 
//  clè API
 const apikey = "32d35220e71dd0567e129e5369b9f0f8"

//  ville par defaut
 let city = "havre"

//  url permettant d'obtenir les previsions meteo
 let url = `https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=${city}&appid=${apikey}`

// on va chercher les infos de l'url
 fetch(url)
 .then(response => response.json())
 .then(data => {
    console.log(data)

    // affiche le nom de la ville
    console.log(data.city.name)
    
   // date et heure
    console.log(data.list[0].dt_txt)

    // temperature
    console.log(data.list[0].main.temp)

    // temps en cours : description
    console.log(data.list[0].weather[0].description)

    // humidite
    console.log(data.list[0].main.humidity)

    // vent
    console.log(data.list[0].wind.speed)


    // Image
    console.log(data.list[0].weather[0].icon)


    // heure lever 
    console.log(data.city.sunrise)

    // heure coucher
    console.log(data.city.sunset)


    // temperature min 
    console.log(data.list[0].main.temp_min)

    // temperature max
    console.log(data.list[0].main.temp_max)


document.querySelector("#interface").innerHTML=`
 <div class="text-white">
      <p class="fs-3 mt-2 text-center fw-bold">${data.city.name}</p>
      <p class="fs-5 mt-2 text-center">${data.list[0].dt_txt}</p>
      <div class="text-center">
        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="">
      </div>
      <p class="text-center">${data.list[0].weather[0].description}</p>
      <p class="text-center">Humidité : ${data.list[0].main.humidity}% / Vent : ${data.list[0].wind.speed*3.6}km/h</p>
      <p class="text-center"><i class="bi bi-brightness-high me-1"></i>08:39 <i
          class="bi bi-moon-fill ms-3 me-1"></i>17:18</p>
      <p class="text-center">${data.list[0].main.temp}°C</p>
      <p class="text-center">Min ${data.list[0].main.temp_min}°c / Max ${data.list[0].main.temp_max}°C</p>
    </div>
`


 })