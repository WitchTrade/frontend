import { FunctionComponent } from 'react';
import Image from 'next/image';

interface Props {
    name: string;
    value: boolean;
    trueIconPath: string;
    falseIconPath: string;
}

const BooleanDisplay: FunctionComponent<Props> = ({ name, value, trueIconPath, falseIconPath }) => {

    return (
        <div className="flex justify-between h-11 rounded-lg bg-wt-surface-dark items-center px-2">
            <p className="ml-1">{name}:</p>
            <Image src={value ? trueIconPath : falseIconPath} height="24px" width="24px" alt="Boolean Icon" />
        </div >
    );
};

export default BooleanDisplay;