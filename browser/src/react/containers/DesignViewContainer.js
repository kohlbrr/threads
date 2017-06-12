import React from 'react';
import { connect } from 'react-redux';
import DesignView from '../components/DesignView';
import { changeProduct } from '../action-creators/product';
import { addToCart } from '../action-creators/cart'
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
  changeProduct,
  addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignViewContainer);
