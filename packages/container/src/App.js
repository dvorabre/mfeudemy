import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Progress from './components/Progress';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
// lazy loading, only when need the component
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName(
  {
    productionPrefix: 'co',
  }
);

const history = createBrowserHistory();
export default () => {

 
  const [isSignedIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('./dashboard');
    }
  }, [isSignedIn]);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignIn(false)} />
          {/* when load the inner data */}
          <Suspense fallback={<Progress/>} >
            <Switch>
              <Route path={"/auth"}>
                <AuthLazy onSignIn={() => setIsSignIn(true)} />
                </Route>
              <Route path={"/"} component={MarketingLazy} />
              <Route path={"/dashboard"}>
                { !isSignedIn && <Redirect to='/' /> }
                <DashboardLazy/>
                </Route>
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};
