import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import App from './containers/App';
import CatalogueContainer from './containers/CatalogueContainer';
import DesignViewContainer from './containers/DesignViewContainer';
import LoginContainer from './containers/LoginContainer';
import SignupContainer from './containers/SignupContainer';
import CartViewContainer from './containers/CartViewContainer';

import { fetchDesigns } from './action-creators/designs';
import { fetchDesign } from './action-creators/currentDesign';
import { fetchCatgories } from './action-creators/categories';
import { fetchUser } from './action-creators/users';
import { fetchCart } from './action-creators/cart';

const loadDesigns = () => {
  store.dispatch(fetchDesigns());
  store.dispatch(fetchCatgories());
};

const loadDesign = (router) => {
  store.dispatch(fetchDesign(router.params.id));
};

const loadCart = () => {
  store.dispatch(fetchCart());
};
const loadUser = () => {
  store.dispatch(fetchUser()).then(() => loadCart());
};


export default function Root() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={loadUser}>
          <Route path="designs" component={CatalogueContainer} onEnter={loadDesigns} />
          <Route path="designs/:id" component={DesignViewContainer} onEnter={loadDesign} />
          <Route path="login" component={LoginContainer} />
          <Route path="signup" component={SignupContainer} />
          <Route path="cart" component={CartViewContainer} onEnter={loadCart} />
          <IndexRedirect to="designs" />
        </Route>
      </Router>
    </Provider>
  );
}
