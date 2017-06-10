import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import App from './containers/App';
import CatalogueContainer from './containers/CatalogueContainer';
import { fetchDesigns } from './action-creators/designs';
import { fetchCatgories } from './action-creators/categories';

const loadDesigns = () => {
  store.dispatch(fetchDesigns());
  store.dispatch(fetchCatgories());
};


export default function Root() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="designs" component={CatalogueContainer} onEnter={loadDesigns} />
          <IndexRedirect to="designs" />
        </Route>
      </Router>
    </Provider>
  );
}
