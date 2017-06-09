import Sidebar from '../components/Sidebar';
import React, { Component } from 'react';
// import { connect } from 'react-redux';

// const mapStateToProps = (state) => {
//   return {
//     categories: state.categories.list,
//   };
// };

// const SidebarContainer = connect(mapStateToProps)(Sidebar);

// export default SidebarContainer;

export default class SidebarContainer extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Sidebar categories={{id:1, name: 'Polos' }} />
    );
  }

}


