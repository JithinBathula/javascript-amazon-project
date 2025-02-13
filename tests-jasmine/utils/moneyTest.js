import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: format currency", () => {
    it('Test if currency is correctly converted form cents to dollars', () => {
        expect(formatCurrency(2020)).toEqual('20.20')
    });


    it('Test with 0 dollars', () => {
        expect(formatCurrency(0)).toEqual('0.00')
    });

})