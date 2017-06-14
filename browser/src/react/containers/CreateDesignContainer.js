import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CreateDesignForm from '../components/CreateDesignForm';
import { addDesign } from '../action-creators/designs';

class CreateDesignContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sex: 'M',
      price: '',
      imageUrl: '',
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, sex, price, imageUrl } = this.state;
    this.setState({
      loading: true,
    });
    this.props.addDesign(name, sex, price, imageUrl)
    .then(() => {
      this.setState({
        loading: false,
        error: null,
      });
      browserHistory.push('/designs');
    }).catch(error => this.setState({
      error,
      loading: false,
    }));
  }

  render() {
    return (
      <CreateDesignForm
        {...this.state}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}


export default connect(null, { addDesign })(CreateDesignContainer);
