import { FunctionComponent } from 'react';

interface Props {
    text?: string;
};

const Loading: FunctionComponent<Props> = ({ text }) => {
    return (
        <div className="flex justify-center items-center">
            <div className="loadingAnim"><div></div><div></div><div></div><div></div></div>
            {text &&
                <p className="text-2xl font-bold m-3">{text}</p>
            }
        </div>
    );
};

export default Loading;