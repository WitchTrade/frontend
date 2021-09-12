import Image from 'next/image';
import { FunctionComponent } from 'react';

interface Props {
    type: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    required: boolean;
    svgPath?: string;
    handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput: FunctionComponent<Props> = ({ type, placeholder, value, setValue, required, svgPath, handleKeyPress }) => {

    return (
        <div className="relative" >
            <input
                className={`w-full h-10 ${svgPath ? 'pl-9' : 'pl-3'} pr-3 text-base placeholder-wt-text border border-wt-accent-light rounded-lg bg-wt-surface-dark focus:outline-none focus:ring-2 focus:ring-wt-accent`}
                type={type}
                placeholder={`${placeholder}${required ? '*' : ''}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            {svgPath &&
                <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none top-0 bot-0">
                    <Image src={svgPath} height="24px" width="24px" alt="Input Icon" />
                </div>
            }
        </div>
    );
};

export default TextInput;