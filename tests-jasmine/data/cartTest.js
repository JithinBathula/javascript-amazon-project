import { addToCart, cart, loadCart} from "../../data/cart.js";

describe("Add to Cart", () => {
    it("Adding an existing product to the cart", () => {

        spyOn(localStorage, "setItem")
        spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([{ productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d" , quantity: 1, deliverOptionId: 1}]));

        loadCart()
        addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");



        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(cart[0].quantity).toEqual(2)

    })
    it("Adding a product that is not in the cart", () => {
        // mock only lasts for 1 test
        // spyon automatically spies on the function and prevents setItem from actually executing. It just tracks the calls
        spyOn(localStorage, "setItem")

        // .and.callFake allows you to modify the behaviour of getItem, so that you can change the logic or simulate different return elements as required
        spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([]));

        // you must call these mock functions only after creating the mocks. otherwise it will be useless.
        loadCart()

        addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
 
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d")
        expect(cart[0].quantity).toEqual(1) 
    })


});