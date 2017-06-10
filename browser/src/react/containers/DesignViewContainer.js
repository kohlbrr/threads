import React from 'react';
import { connect } from 'react-redux';
import DesignView from '../components/DesignView';
import { setCurrentProduct } from '../action-creators/product';

class DesignViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '',
    };
    this.changeColor = this.changeColor.bind(this);
  }

  componentnWillRecieveProps(nextProps) {
    if (this.props.design !== nextProps.design) {
      this.setState({
        selectedColor: nextProps.design.products[0].color,
      });
    }
  }

  changeColor(color) {
    this.setState({
      selectedColor: color,
    });
  }

  render() {
    return (
      <DesignView
        changeColor={this.changeColor}
        selectedColor={this.state.selectedColor}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({ currentDesign, currentProduct }) => ({
  design: currentDesign,
  currentProduct,
});

const mapDispatchToProps = {
  selectProduct: setCurrentProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignViewContainer);