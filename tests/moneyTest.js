import { formatCurrency } from "../scripts/utils/money.js";


console.log("Test Suite: Format Currency")

//base cases
console.log("Test if currency is correctly converted form cents to dollars")

if(formatCurrency(2020) == '20.20'){
    console.log("Passed")
}else{
    console.log("failed")
}

//edge cases
console.log("Test with 0 dollars")

if(formatCurrency(0) == 0.00){
    console.log("Passed")
}else{
    console.log("failed")
}
