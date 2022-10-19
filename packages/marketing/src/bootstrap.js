import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  // listen to history and call callback.
  if(onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  // move the function to the call, that the parent will can call children
  const obj = {
    onParentNavigate: ({ pathname: nextPathname}) => {

      const { pathname } = history.location;
      if (pathname !== nextPathname){
        history.push(nextPathname);
      }
    }
  };
  console.log(obj, "onParent");
  return obj;
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running through container
// and we should export the mount function
export { mount };
