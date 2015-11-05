import App from './app/app.react';
import Home from './shop/shop.react';

import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
  </Route>
);
//<Route handler={Login} name="login" />
