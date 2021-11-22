import { FunctionComponent } from 'react';

const Note: FunctionComponent = ({ children }) => {
  return (
    <p className="text-center text-wt-accent text-sm">{children}</p>
  );
};

export default Note;
