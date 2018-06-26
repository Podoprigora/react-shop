import React from "react";
import PropTypes from "prop-types";

import ModalWindow, { WindowHeader, WindowContent, WindowButtons } from "../components/ui/Window";
import Button from "../components/ui/Button";

class AddToCartPreviewWindow extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func
  };

  render() {
    const { open, onClose } = this.props;

    return (
      <ModalWindow open={open} onClose={onClose} width="600">
        <WindowHeader align="center">Product was added to cart.</WindowHeader>
        <WindowContent>Product</WindowContent>
        <WindowButtons justifyContent="center">
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
