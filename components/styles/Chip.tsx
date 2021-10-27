import { FunctionComponent } from 'react';

interface Props {
  title: string;
  text?: string;
}

const Chip: FunctionComponent<Props> = ({ title, text }) => {
  return (
    <div className="border border-wt-accent rounded-full py-1 px-4 m-1">
      <p><span className="font-bold text-wt-accent">{title}:</span> <span className="text-sm">{text}</span></p>
    </div>
  );
};

export default Chip;
