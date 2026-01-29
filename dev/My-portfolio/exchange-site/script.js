const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");
const swapBtn = document.getElementById("swap");

let rates = {};

// Exceptions for country code mapping
function getCountryCode(currency) {
  const exceptions = {
    EUR: "EU", XOF: "SN", XAF: "CM", XCD: "AG", XPF: "PF",
    ANG: "CW", BHD: "BH", KWD: "KW", QAR: "QA",
    OMR: "OM", SAR: "SA", AED: "AE"
  };
  return exceptions[currency] || currency.slice(0, 2);
}

// Currency full names
const currencyNames = {
  USD: "United States Dollar", EUR: "Euro", GBP: "British Pound",
  JPY: "Japanese Yen", AUD: "Australian Dollar", CAD: "Canadian Dollar",
  CHF: "Swiss Franc", CNY: "Chinese Yuan", NZD: "New Zealand Dollar",
  SEK: "Swedish Krona", MXN: "Mexican Peso", SGD: "Singapore Dollar",
  HKD: "Hong Kong Dollar", NOK: "Norwegian Krone", KRW: "South Korean Won",
  TRY: "Turkish Lira", INR: "Indian Rupee", RUB: "Russian Ruble",
  BRL: "Brazilian Real", ZAR: "South African Rand",
};

// Update flag
function updateFlag(select, img) {
  const code = getCountryCode(select.value);
  img.src = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}

// Convert
function convert() {
  const value = parseFloat(amount.value);
  if (!value || !rates[fromCurrency.value] || !rates[toCurrency.value]) return;

  const converted = (value / rates[fromCurrency.value]) * rates[toCurrency.value];
  const fromFull = currencyNames[fromCurrency.value] || "";
  const toFull = currencyNames[toCurrency.value] || "";

  result.textContent = `${value} ${fromCurrency.value}${fromFull ? ` - ${fromFull}` : ""} = ${converted.toFixed(2)} ${toCurrency.value}${toFull ? ` - ${toFull}` : ""}`;
}

// Swap currencies
swapBtn.addEventListener("click", () => {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);
  convert();
});

// Fetch rates and populate dropdowns
fetch("https://open.er-api.com/v6/latest/USD")
  .then(res => res.json())
  .then(data => {
    rates = data.rates;

    for (let code in rates) {
      const name = currencyNames[code] ? ` - ${currencyNames[code]}` : "";

      const opt1 = document.createElement("option");
      opt1.value = code;
      opt1.textContent = `${code}${name}`;
      fromCurrency.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = code;
      opt2.textContent = `${code}${name}`;
      toCurrency.appendChild(opt2);
    }

    // Set defaults
    fromCurrency.value = "USD";
    toCurrency.value = "EUR";
    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
    convert();

    // Event listeners
    fromCurrency.addEventListener("change", () => {
      updateFlag(fromCurrency, fromFlag);
      convert();
    });
    toCurrency.addEventListener("change", () => {
      updateFlag(toCurrency, toFlag);
      convert();
    });
    amount.addEventListener("input", convert);
  })
  .catch(() => {
    result.textContent = "Failed to load exchange rates.";
  });
