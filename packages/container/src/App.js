import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Progress from './components/Progress';
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

// lazy loading, only when need the component
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName(
  {
    productionPrefix: 'co',
  }
);

export default () => {

  const [isSignedIn, setIsSignIn] = useState(false);
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignIn(false)} />
          {/* when load the inner data */}
          <Suspense fallback={<Progress/>} >
            <Switch>
              <Route path={"/auth"}>
                <AuthLazy onSignIn={() => setIsSignIn(true)} />
                </Route>
              <Route path={"/"} component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
