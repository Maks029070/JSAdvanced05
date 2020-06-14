async function convertJSONdata(amount, from, to) {
   fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11')
      .then(data => data.json())
      .then(res => convertation(res, amount, from, to))
      .catch(error => console.error(error));
}



function convertation(res, amount, from, to) {
   let fromCurrency = res.find(item => item.ccy == from);
   let toCurrency = res.find(item => item.ccy == to);
   try {
      let result;
      if (from == 'UAH' && to == 'UAH') {
         result = amount.toFixed(2);
         console.log(result);
         return result;
      } else if (from == 'UAH') {
         result = parseFloat(amount / toCurrency.buy);
         result = result.toFixed(2);
         console.log(result);
         return result;
      } else if (to == 'UAH') {
         result = parseFloat(fromCurrency.buy * amount);
         result = result.toFixed(2);
         console.log(result);
         return result;
      } else {
         result = Math.round((parseFloat(fromCurrency.buy) / parseFloat(toCurrency.buy) * amount) * 100) / 100;
         result = result.toFixed(2);
         console.log(result);
         return result;
      }
   } catch (e) {
      console.log(e);
   }
}

let fromElem = document.getElementById("fromCurrency");
let toElem = document.getElementById("toCurrency");

let from = fromElem.options[fromElem.selectedIndex].value;
let to = toElem.options[toElem.selectedIndex].value;

fromElem.addEventListener('change', function () {
   from = fromElem.options[fromElem.selectedIndex].value;
   console.log(from);
});
toElem.addEventListener('change', function () {
   to = toElem.options[toElem.selectedIndex].value;
   console.log(to);
});

let valueInput = document.getElementById('value');
let resultInput = document.getElementById('result');

document.getElementById('convert').addEventListener('click', function () {
   let result = convertJSONdata(parseFloat(valueInput.value), from, to);
   console.log(result);
});