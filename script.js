var tablinks=document.getElementsByClassName("tab-links");
var tabcontents=document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}

var topBannerList = document.getElementById("top-banner-list");

function openmenu() {
    if (window.matchMedia("(max-width: 450px)").matches) {
        topBannerList.style.right = "0";
    }
}

function closemenu() {
    if (window.matchMedia("(max-width: 450px)").matches) {
        topBannerList.style.right = "-200px";
    }
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let submitButton = document.querySelector(".submit-btn");
    let statusText = document.getElementById("form-status");

    submitButton.disabled = true;
    statusText.style.display = "block";
    statusText.innerText = "Submitting...";

    let formData = new FormData(this);

    fetch("https://script.google.com/macros/s/AKfycbwXpPpI3GfAUa2RU4TiMM625Yc_X_0fY7H8GwK84qe0pKEwHKtvBo7D7RLz9AriFEKs0A/exec", { // Replace with your Web App URL
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        if (data.toLowerCase().includes("success")) {
            statusText.innerText = "✅ Form submitted successfully!";
            statusText.style.color = "green";
            document.getElementById("contactForm").reset();
        } else {
            throw new Error("Unexpected response: " + data);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        statusText.innerText = "❌ Error submitting form. Try again.";
        statusText.style.color = "red";
    })
    .finally(() => {
        setTimeout(() => { statusText.style.display = "none"; }, 5000);
        submitButton.disabled = false;
    });
});





