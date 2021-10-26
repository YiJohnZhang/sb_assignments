
it('should calculate the monthly rate correctly', function () {
  // ...
  expect(calculateMonthlyPayment({amount:5000,years:1,rate:5})).toEqual(47.01);
  expect(calculateMonthlyPayment({amount:0,years:1,rate:5})).toEqual(0.00);
});


it("should return a result with 2 decimal places", function() {
  expect(`${calculateMonthlyPayment({amount:5000,years:1,rate:5})}`.split('.')[1].length).toEqual(2);
});

it('getCurrentUIValues: should return the values of the inputs as is', function(){
  domReady();
  expect(parseInt(document.getElementById('loan-amount').value)).toEqual(5000);
  expect(parseInt(document.getElementById('loan-years').value)).toEqual(1);
  expect(parseInt(document.getElementById('loan-rate').value)).toEqual(5);
});

function domReady(){}

document.addEventListener('DOMContentLoaded',domReady);
/// etc
