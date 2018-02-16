import React from "react";

export default WrappedComponent => {
  class DataLoader extends React.Component {
    state = {};
    render() {
      return <WrappedComponent />;
    }
  }
  return DataLoader;
};
