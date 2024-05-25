navigator.geolocation.getCurrentPosition(
  (position) => {
    var requestOptions = {
      method: "GET",
    };
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=4067e9f046e249ec8afa65a831b54c98`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.features && data.features.length > 0) {
          const locationObject = data.features[0].properties;
          const timezone = locationObject.timezone.name;
          const latitude = locationObject.lat;
          const longitude = locationObject.lon;
          const offsetSTD = locationObject.timezone.offset_STD;
          const offsetSTDSeconds = locationObject.timezone.offset_STD_seconds;
          const offsetDST = locationObject.timezone.offset_DST
          ;
          const offsetDSTSeconds = locationObject.timezone.offset_DST_seconds;
          const country = locationObject.country;
          const postcode = locationObject.postcode;
          const city = locationObject.city;

          document.getElementById("Current-time").innerHTML = `
            <div class="result2">
            <h1>TimeZone API <br> Your Current Time Zone</h1>
            <div>
                <p>Name Of Time Zone : ${timezone}</p>
                <div class="insidediv">
                    <p>Lat: ${latitude}</p>
                    <p>Long: ${longitude}</p>
                </div>
                <p>Offset STD: ${offsetSTD}</p>
                <p>Offset STD Seconds : ${offsetSTDSeconds}</p>
                <p>Offset DST : ${offsetDST}</p>
                <p>Offset DST Seconds: ${offsetDSTSeconds}</p>
                <p>Country: ${country}</p>
                <p>Postcode: ${postcode}</p>
                <p>City: ${city}</p>
            </div>
        </div>`;
        } else {
          console.error("No location found for the given city.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  (error) => {
    console.error("Error getting current position:", error);
  }
);

function getLocationInformation() {
  const city = document.getElementById("city").value;
  var requestOptions = {
    method: "GET",
  };

  if (!city) {
    document.getElementById(
      "result"
    ).innerHTML = `<P style="color: red;">Please enter an address!</P>`;
  }

  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${city}&apiKey=4067e9f046e249ec8afa65a831b54c98`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.features && data.features.length > 0) {
        console.log(data);
        const locationObject = data.features[0].properties;
        const timezone = locationObject.timezone.name;
        const latitude = locationObject.lat;
        const longitude = locationObject.lon;
        const offsetSTD = locationObject.timezone.offset_STD;
        const offsetSTDSeconds = locationObject.timezone.offset_STD_seconds;
        const offsetDST = locationObject.timezone.offset_DST;
        const offsetDSTSeconds = locationObject.timezone.offset_DST_seconds;
        const country = locationObject.country;
        const postcode = locationObject.postcode;
        const city = locationObject.city;

        // Update the DOM with location information
        document.getElementById("result").innerHTML = `
                <div class="result2">
                <h1>Your result</h1>
                <div>
                    <p>Name Of Time Zone : ${timezone}</p>
                    <div class="insidediv">
                        <p>Lat: ${latitude}</p>
                        <p>Long: ${longitude}</p>
                    </div>
                    <p>Offset STD: ${offsetSTD}</p>
                    <p>Offset STD Seconds : ${offsetSTDSeconds}</p>
                    <p>Offset DST : ${offsetDST}</p>
                    <p>Offset DST Seconds: ${offsetDSTSeconds}</p>
                    <p>Country: ${country}</p>
                    <p>Postcode: ${postcode}</p>
                    <p>City: ${city}</p>
                </div>
            </div>`;
      } else {
        console.error("No location found for the given city.");
      }
    })
    .catch((error) => {
      console.error("Error fetching location information:", error);
    });
}
