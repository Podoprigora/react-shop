import React from "react";

import Button from "../components/ui/Button";

const CartPage = () => (
    <div className="page-container">
        <header className="page-container__header">
            <h3 className="page-container__title">Your shopping cart</h3>
        </header>
        <div className="page-container__body">products list</div>
        <div className="page-container__buttons">
            <Button>Return to shoping</Button>
            <Button primary>Go to Checkout</Button>
        </div>
    </div>
);

export default CartPage;
