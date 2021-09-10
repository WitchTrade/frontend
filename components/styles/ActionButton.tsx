import { forwardRef, FunctionComponent, KeyboardEvent } from 'react';

interface Types {
    [key: string]: string;
}

interface Props {
    onClick: () => void;
    type: string;
}

const defaultStyle = "px-3 py-2 focus:outline-none rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent ";

const ActionButton: FunctionComponent<Props> = ({ onClick, children, type }) => {
    const types: Types = {
        neutral: 'text-wt-text bg-wt-hover hover:bg-wt-selected-dark rounded-md',
        proceed: 'text-wt-light bg-wt-success-dark hover:bg-wt-success',
        cancel: 'text-wt-light bg-wt-error-dark hover:bg-wt-error',
    };

    return (
        <button className={defaultStyle + types[type]} onClick={onClick}>
            {children}
        </button>
    );
};

export default ActionButton;