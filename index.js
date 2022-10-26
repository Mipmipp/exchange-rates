let myHeaders = new Headers();
myHeaders.append("apikey", "9EbuNKqViyzPNFQDaqQRO509ta8vnRZM");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


function getCurrenciesList() {
  fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
  .then(response => response.json())
  .then(response => getEveryCurrency(response.symbols))
  .catch(error => console.log('error', error));
}

function getEveryCurrency(symbols) {
  const $currencyBase = document.querySelector('#currency-base');
  const $currencyToConvert = document.querySelector('#currency-to-convert');
  let keys = Object.keys(symbols);

  keys.forEach(function(key) {
    const $option = document.createElement('option');
    $option.value = key;
    $option.textContent = key;
    $currencyBase.appendChild($option);
  });

  keys.forEach(function(key) {
    const $option = document.createElement('option');
    $option.value = key;
    $option.textContent = key;
    $currencyToConvert.appendChild($option);
  });
}

function convertCurrencyToOther() {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${currencyToConvert}&from=${currencyBase}&amount=${amount}`, requestOptions)
  .then(response => response.json())
  .then(response => updateResult(response.result))
  .catch(error => console.log('error', error));
}

function getBaseEqualsOfCurrencies() {
  fetch("https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2C%20EUR%2C%20JPY%2C%20GBP.%20AUD.%20CAD%2C%20CHF%2C%20CNY%2CSEK%2C%20MXN%2C%20NZD%2C%20SGD%2C%20HKD%2C%20NOK%2C%20KRW%2C%20TRY%2C%20INR%2C%20RUB%2C%20BRL&base=EUR", requestOptions)
  .then(response => response.json())
  .then(result => showEqualsOfCurrencies(result.rates))
  .catch(error => console.log('error', error));
}

function getValuesEqualsOfCurrencies() {
  fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2C%20EUR%2C%20JPY%2C%20GBP.%20AUD.%20CAD%2C%20CHF%2C%20CNY%2CSEK%2C%20MXN%2C%20NZD%2C%20SGD%2C%20HKD%2C%20NOK%2C%20KRW%2C%20TRY%2C%20INR%2C%20RUB%2C%20BRL&base=${currencyBase}`, requestOptions)
  .then(response => response.json())
  .then(result => {
    arrayValues = Object.values(result.rates)
  })
  .catch(error => console.log('error', error));
}

