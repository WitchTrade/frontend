import { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode
  text: string;
}

const Tooltip: FunctionComponent<Props> = ({ text, children }) => {

  return (
    <div className="group text-center relative inline-block whitespace-nowrap">
      <div className="flex items-center transition duration-100 transform hover:scale-110">
        {children}
      </div>
      <span className="absolute hidden group-hover:block z-20 text-sm left-1/2 transform -translate-x-1/2 bg-wt-surface-dark text-wt-accent font-bold rounded-lg py-1 px-2 mt-1 border border-wt-accent">{text}</span>
    </div>
  );
};

export default Tooltip;
