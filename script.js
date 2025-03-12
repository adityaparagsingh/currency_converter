const URl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

const dropdown = document.querySelectorAll(".dropdown select");

// for (code in countryList) {
//     console.log(code,countryList[code]);
// }

for (let select of dropdown) {
    for (currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(select.name ==="from" && currencyCode==="USD"){
            newOption.selected = true;
        }
        else  if(select.name ==="to" && currencyCode==="INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateFlag = (element) =>{
    // console.log(element);
    let currencyCode = element.value;
    // console.log(currencyCode);
    let countryCode = countryList[currencyCode];
    // console.log(countryCode);
    let img = element.parentElement.querySelector("img");
    let flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.src = flag;

}