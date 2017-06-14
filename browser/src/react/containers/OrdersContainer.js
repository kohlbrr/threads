import React, { Component } from 'react';
import { connect } from 'react-redux';
import Orders from '../components/Orders';
import { changeStatus, setSelectedOrder } from '../action-creators/orders';
import FilterInput from '../components/FilterInput';

class OrdersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    this.handleChange = this.handleChange.bind(this);
    this.changeStatus = changeStatus;
    this.change =  (order, status) => {
     console.log('change status',order, status);
     this.changeStatus(8,'Pending');
    }
  }

  handleChange(evt) {
    const inputValue = evt.target.value;
    this.setState({ inputValue });
  }

  render() {
    const inputValue = this.state.inputValue;
    console.log(this.props.orders.list)
    const filteredOrders = this.props.orders.list.filter(order => order.user && order.user.email.match(inputValue));
    return (
      <div>
        <h3>Orders</h3>
        <FilterInput handleChange={this.handleChange} inputValue={inputValue} />
        <Orders orders={filteredOrders} updateStatus={changeStatus} setSelectOrder={this.props.setSelectedOrder} />
      </div>
    );
  }
}

const mapStateToProps = state => state;

// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeStatus,
//   };
// };

export default connect(mapStateToProps, { changeStatus, setSelectedOrder })(OrdersContainer);

