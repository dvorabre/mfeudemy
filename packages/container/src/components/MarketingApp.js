import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    console.log(mount, "mount in mark");
   
    const por = mount(ref.current, {
      onNavigate: ({pathname: nextPathname}) => {
        // listen get a location object that contain pathname property hith the path
        const { pathname } = history.location;
        if (pathname !== nextPathname){
          history.push(nextPathname);
        }
      },
    });
    console.log(por, "mount in mark");
    // move to the module when navigate happened
    const { onParentNavigate } = por
    history.listen(onParentNavigate);

  }, []);

  return <div ref={ref} />;
};
