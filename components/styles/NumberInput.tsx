import { FunctionComponent } from 'react';

interface Props {
    value: number;
    setValue: (value: number) => void;
    min: number;
    max: number;
}

const NumberInput: FunctionComponent<Props> = ({ value, setValue, min, max }) => {

    const validateValue = (value: number) => {
        if (isNaN(value)) {
            setValue(0);
            return;
        }

        if (value >= min && value <= max) {
            setValue(value);
        }
    };

    return (
        <input
            className={`w-20 h-11 pl-3 pr-3 text-base placeholder-wt-text border border-wt-accent-light rounded-lg bg-wt-surface-dark focus:outline-none focus:ring-2 focus:ring-wt-accent`}
            value={value.toString()}
            onChange={(e) => validateValue(parseInt(e.target.value))}
            type="number"
        />
    );
};

export default NumberInput;