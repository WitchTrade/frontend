import { FunctionComponent } from 'react';

interface Props {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  rows: number;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FunctionComponent<Props> = ({ placeholder, value, setValue, rows, handleKeyPress }) => {

  return (
    <div className="relative" >
      <textarea
        className={`w-full px-3 py-1 text-base placeholder-wt-text border border-wt-accent-light rounded-lg bg-wt-surface-dark focus:outline-none focus:ring-2 focus:ring-wt-accent`}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Textarea;
