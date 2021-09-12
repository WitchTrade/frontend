import { FunctionComponent } from 'react';

interface Props {
    areaTitle: string;
}

const PickerArea: FunctionComponent<Props> = ({ children, areaTitle }) => {
    return (
        <div className="bg-wt-surface-dark rounded-lg p-2 m-1 border-2 border-wt-accent">
            <p className="text-center text-wt-accent-light text-sm">{areaTitle}</p>
            <div className="flex flex-wrap justify-center">
                {children}
            </div>
        </div>
    );
};

export default PickerArea;