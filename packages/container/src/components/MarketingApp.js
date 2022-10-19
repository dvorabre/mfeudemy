import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {

    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({pathname: nextPathname}) => {
        // listen get a location object that contain pathname property hith the path
        const { pathname } = history.location;
        if (pathname !== nextPathname){
          history.push(nextPathname);
        }
      },
    });

    // move to the module when navigate happened
    history.listen(onParentNavigate);

  }, []);

  return <div ref={ref} />;
};
