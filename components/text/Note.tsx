import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode
}

const Note: FunctionComponent<Props> = ({ children }) => {
  return (
    <p className="text-center text-wt-accent text-sm">{children}</p>
  );
};

export default Note;
