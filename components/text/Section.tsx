import { FunctionComponent, ReactNode } from 'react';
interface Props {
  children: ReactNode
}

const Section: FunctionComponent<Props> = ({ children }) => {
  return (
    <p className="my-2">{children}</p>
  );
};

export default Section;
