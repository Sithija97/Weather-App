//following function will work after loading the page
window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = "https://cors-anywhere.herokuapp.com/";
                const api = `${proxy}https://api.darksky.net/forecast/efdae71f7ae021003f2cfc8be1f27f00/${lat},${long}`;

                fetch(api)
                    .then(response =>{
                        return response.json(); //coverting the response into jason format
                    })
                    .then(data =>{
                        console.log(data);
                        const {temperature, summary, icon} = data.currently;
                        //set Dom elemetns from the API
                        temperatureDegree.textContent = Math.floor((temperature - 32) / (9/5));
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        //set Icon
                        setIcons(icon, document.querySelector(".icon"));
                    });
            });
    }//navigator method

    function setIcons(icon, iconID){
        const skycons = new Skycons ({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }


})