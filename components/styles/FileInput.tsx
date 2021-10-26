import { FunctionComponent } from 'react';

interface Props {
  inputId: string;
  text: string;
  inputChanged?: () => void;
  inputRef: any;
}

const FileInput: FunctionComponent<Props> = ({ inputId, text, inputChanged, inputRef }) => {

  return (
    <div className="relative" >
      <input
        id={inputId}
        type="file"
        className="hidden"
        accept="application/json"
        ref={inputRef}
        onChange={inputChanged}
      />
      <label htmlFor={inputId} tabIndex={0} className="px-3 py-1 focus:outline-none rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent flex leading-6 text-wt-light bg-wt-success-dark hover:bg-wt-success">
        <p>{text}</p>
      </label>
    </div>
  );
};

export default FileInput;
