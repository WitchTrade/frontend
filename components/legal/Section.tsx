import { FunctionComponent } from 'react';

const Section: FunctionComponent = ({ children }) => {
  return (
    <p className="my-2">{children}</p>
  );
};

export default Section;
