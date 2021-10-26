describe('helpers test with setup and tear-down', function(){

    beforeAll(function(){

        billAmtInput.value = 12;
        tipAmtInput.value = 3;
        submitPaymentInfo();

        billAmtInput.value = 4;
        tipAmtInput.value = 1;
        submitPaymentInfo();

    });

    it('should check that submitPaymentInfo() resets input values', function(){

        expect(billAmtInput.value).toEqual('');
        expect(tipAmtInput.value).toEqual('');

    });

    it('should correctly return the parameters of the payment (test createCurPayment(), appendPaymentTable(...) in payments.js & calculateTipPercent in helper.js)', function(){

        expect(document.getElementById('paymentTable').getElementsByTagName('tbody')[0].innerText).toEqual('$12\t$3\t25%\n$4\t$1\t25%');
        expect(document.getElementById('paymentTable').getElementsByTagName('tbody')[0].children.length).toEqual(2);

    });

    it('should correctly return shift summary details (test updateSummary() in payments.js and sumPaymentTotal(type) in helper.js)', function(){

        summaryTableValues = {'billTotal': 16, 'tipTotal': 4, 'tipAveragePct': 25};
        expect(document.getElementById('summaryTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].innerText).toEqual(`$${summaryTableValues.billTotal}\t$${summaryTableValues.tipTotal}\t${summaryTableValues.tipAveragePct}%`);

    });

    afterAll(function(){

        const parentElementOne = document.getElementById('paymentTable').getElementsByTagName('tbody')[0];
        while(parentElementOne.firstChild){
            parentElementOne.removeChild(parentElementOne.firstChild);
        }

        const parentElementTwo = document.getElementById('summaryTable').getElementsByTagName('tbody')[0];
        while(parentElementTwo.firstChild){
            parentElementTwo.removeChild(parentElementTwo.firstChild);
        }

        allPayments = {};
        paymentId = 0;

    });

});