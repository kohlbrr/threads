import React from 'react';
import { Link } from 'react-router';
import Time from 'react-time';


export default function Orders(props) {
  const orders = props.orders;
  const orderStatuses = ['Delivered', 'Shipped', 'Canceled', 'Pending'];
  const changeStatus = props.updateStatus;
  const setSelectedOrder = props.setSelectedOrder;


  function loadStatuses(statuses) {
    const options = [];
    for (let i = 0; i <= statuses.length - 1; i += 1) {
      options.push(<option key={i + 1} value={statuses[i]}>{statuses[i]}</option>);
    }
    return options;
  }

  return (
    <div>
        <table className="table table-hover">
          <thead className="thead">
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              orders && orders.map(order => (
                <tr key={order.id} className={order.status === 'Canceled' ? 'bg-warning' : ''} >
                  <td>
                    <Time value={order.timestamp} format="YYYY/MM/DD" />
                  </td>
                  <td>
                    <select value={order.status} onChange={e => changeStatus(order.id, e.target.value)}>
                      { loadStatuses(orderStatuses) }
                    </select>
                  </td>
                  { props.currentUser ? '' :
                  <td>
                    <Link id={`user${order.user.id}`} to={`/users/${order.user.id}`} >
                      {order.user.email}
                    </Link>
                  </td>
                  }
                  <td >
                    <button id="btnShowOrder" onClick={() => setSelectedOrder(order)} className="glyphicon glyphicon-search" />
                    <Link to={`/admin/orders/${order.id}`}>
                    </Link>
                  </td>
                </tr>
          ))
        }
          </tbody>
        </table>
    </div>
  );
}

