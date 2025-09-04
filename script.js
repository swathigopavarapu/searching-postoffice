// Fetch IP address
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
    document.getElementById("ip2").textContent = data.ip;
  });

// On button click, fetch location details
document.getElementById("getStarted").addEventListener("click", () => {
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      document.getElementById("beforeClick").classList.add("hidden");
      document.getElementById("afterClick").classList.remove("hidden");

      // Fill details
      document.getElementById("lat").textContent = data.latitude;
      document.getElementById("lon").textContent = data.longitude;
      document.getElementById("city").textContent = data.city;
      document.getElementById("region").textContent = data.region;
      document.getElementById("org").textContent = data.org;
      document.getElementById("hostname").textContent = data.hostname || "N/A";
      document.getElementById("timezone").textContent = data.timezone;
      document.getElementById("datetime").textContent = new Date().toLocaleString();

      // Map
      document.getElementById("map").innerHTML = `
        <iframe
          src="https://www.google.com/maps?q=${data.latitude},${data.longitude}&z=14&output=embed"
          allowfullscreen
          loading="lazy">
        </iframe>`;

      // Post office info
      fetch(`https://api.postalpincode.in/pincode/${data.postal}`)
        .then(res => res.json())
        .then(pincodeData => {
          document.getElementById("pincode").textContent = data.postal;
          document.getElementById("msg").textContent = pincodeData[0].PostOffice?.length || 0;
        });
    });
});
