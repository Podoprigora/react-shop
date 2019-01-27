import React from "react";
import PropTypes from "prop-types";

import ModalWindow, { WindowHeader, WindowContent, WindowButtons } from "../../components/ui/Window";
import Button from "../../components/ui/Button";
import AddToCartPreviewTableView from "./TableView";
import data from "../../../../data/add-to-cart-preview";

class AddToCartPreviewWindow extends React.PureComponent {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func
    };

    render() {
        const { open, onClose } = this.props;

        return (
            <ModalWindow open={open} onClose={onClose} width="600">
                <WindowHeader align="left">Product was added to cart.</WindowHeader>
                <WindowContent>
                    <AddToCartPreviewTableView data={[data]} />
                </WindowContent>
                <WindowButtons justifyContent="flex-end">
                    <Button plain onClick={onClose}>
                        Return to shoping
                    </Button>
                    <Button primary plain>
                        To Cart
                    </Button>
                </WindowButtons>
            </ModalWindow>
        );
    }
}

export default AddToCartPreviewWindow;
