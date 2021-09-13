import { FunctionComponent } from 'react';

interface Types {
    [key: string]: string;
}

interface Props {
    onClick: () => void;
    type: string;
    disabled?: boolean;
}

const defaultStyle = "px-3 py-1 focus:outline-none rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-wt-accent font-medium flex leading-6 disabled:cursor-not-allowed disabled:bg-gray-400 ";

const ActionButton: FunctionComponent<Props> = ({ onClick, children, type, disabled }) => {
    const types: Types = {
        neutral: 'hover:bg-wt-hover rounded-md',
        'neutral-enabled': 'bg-wt-selected-dark hover:bg-wt-hover rounded-md',
        info: 'text-wt-light bg-wt-info-dark hover:bg-wt-info',
        proceed: 'text-wt-light bg-wt-success-dark hover:bg-wt-success',
        warning: 'text-wt-light bg-wt-warning-dark hover:bg-wt-warning',
        cancel: 'text-wt-light bg-wt-error-dark hover:bg-wt-error',
    };

    return (
        <button className={defaultStyle + types[type]} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default ActionButton;