
// WEBSITE WHERE ALL COUNTRIES FLAGS ARE AVAILABLE :: https://flagsapi.com/
// THE LINK WHICH WE ARE USING FOR IMAGES FROM THE ABOVE WEBSITE :: <img src="https://flagsapi.com/BE/flat/64.png">


const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate country dropdowns with currency codes
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update exchange rate from the API
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        if (data && data.rates) {
            const rate = data.rates[toCurr.value]; 
            const finalAmount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        } else {
            msg.innerText = "Error fetching exchange rates!";
        }
    } catch (error) {
        msg.innerText = "Error fetching exchange rates!";
    }
};

// Update the flag image when the currency is changed
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Handle the button click to trigger exchange rate update
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

// Load exchange rate on initial page load
window.addEventListener("load", () => {
    updateExchangeRate();
});
