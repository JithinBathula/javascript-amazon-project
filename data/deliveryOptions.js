import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


export function getDeliverOptionUsingId(id){
    return deliveryOptions.find(item => item.id == id)
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
  }

export function calculateDeliveryDate(id){
    const deliveryoption = getDeliverOptionUsingId(id);
    let workdays = deliveryoption.deliverydays
    let deliverydate = dayjs();
    while (workdays > 0){
        deliverydate = deliverydate.add(1,"day")
        if (!isWeekend(deliverydate)){
            workdays--;
        }
    }
    
    const deliverydatestring = deliverydate.format("dddd, MMMM D, YYYY");

    return deliverydatestring
    
}
export const deliveryOptions = [{
    "id": 1,
    "deliverydays": 10,
    "priceCents": 0
}, {
    "id": 2,
    "deliverydays": 5,
    "priceCents": 499

}, {
    "id": 3,
    "deliverydays": 1,
    "priceCents": 999

}]


