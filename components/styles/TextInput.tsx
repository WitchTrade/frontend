import Image from 'next/image';
import { FunctionComponent } from 'react';
import useThemeProvider from '../../shared/providers/theme.provider';

interface Props {
  type: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  required: boolean;
  svgPath?: string;
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autocompleteValue?: string;
  clearOption?: boolean;
}

const TextInput: FunctionComponent<Props> = ({ type, placeholder, value, setValue, required, svgPath, handleKeyPress, autocompleteValue, clearOption }) => {

  const { theme } = useThemeProvider();

  return (
    <div className="relative" >
      <input
        className={`w-full h-11 ${svgPath ? 'pl-9' : 'pl-3'} pr-3 text-base placeholder-wt-text border border-wt-accent-light rounded-lg bg-wt-surface-dark focus:outline-none focus:ring-2 focus:ring-wt-accent`}
        type={type}
        placeholder={`${placeholder}${required ? '*' : ''}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete={autocompleteValue}
      />
      {svgPath &&
        <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none top-0 bot-0">
          <Image src={svgPath} height="24px" width="24px" alt="Input Icon" />
        </div>
      }
      {clearOption && value &&
        <button className="absolute inset-y-0 right-0 flex items-center px-2" onClick={() => setValue('')}>
          <Image src={`/assets/svgs/close/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Clear Input Icon" />
        </button>
      }
    </div>
  );
};

export default TextInput;
