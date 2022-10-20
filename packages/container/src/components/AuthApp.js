import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    console.log(mount, "mount in auth!");
   
    const por = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({pathname: nextPathname}) => {
        // listen get a location object that contain pathname property hith the path
        const { pathname } = history.location;
        if (pathname !== nextPathname){
          history.push(nextPathname);
        }
      },
      onSignIn
    });
    console.log(por, "mount in auth");
    // move to the module when navigate happened
    const { onParentNavigate } = por;
    history.listen(onParentNavigate);

  }, []);

  return <div ref={ref} />;
};
