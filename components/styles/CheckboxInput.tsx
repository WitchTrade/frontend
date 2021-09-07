import { FunctionComponent } from 'react';

interface Props {
    placeholder: string;
    value: boolean;
    setValue: (value: boolean) => void;
}

const CheckboxInput: FunctionComponent<Props> = ({ value, placeholder, setValue }) => {

    return (
        <div className="flex justify-center items-center h-10">
            <input className="h-7 w-7 focus:outline-none mr-2 text-wt-accent-light bg-wt-accent-light" type="checkbox" checked={value} onChange={() => setValue(!value)} />
            <p className="text-wt-text">{placeholder}</p>
        </div>
    );
};

export default CheckboxInput;