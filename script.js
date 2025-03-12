const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let toCurrency = document.querySelector("#to");
let fromCurrency = document.querySelector("#from");

// Populate dropdowns with currency options
for (let select of dropdown) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (select.name === "from" && currencyCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currencyCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// ✅ Fix: Correctly update the flag for the selected currency
const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];

    if (!countryCode) {
        console.error("Country code not found for", currencyCode);
        return;
    }

    // ✅ Select the correct image inside the corresponding select-container
    let img = element.closest(".select-container").querySelector("img");
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// ✅ Async function to fetch exchange rate
const getExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value.trim();

    // Validate input
    if (amtVal === "" || amtVal <= 0) {
        alert("Invalid Input! Defaulting to 1.");
        amtVal = 1;
        amount.value = 1;
    }

    // Construct API URL
    const URL = `${baseURL}/${fromCurrency.value.toLowerCase()}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let exchangeRate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
        let convertedAmount = (amtVal * exchangeRate).toFixed(2);

        document.querySelector(".conclusion").innerText = `${amtVal} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        alert("Failed to fetch exchange rate. Try again later.");
    }
};

// ✅ Button click event listener to fetch the exchange rate
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    getExchangeRate();
});
