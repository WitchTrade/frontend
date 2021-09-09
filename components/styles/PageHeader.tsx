import { FunctionComponent } from 'react';

interface Props {
    title: string;
    description?: string;
}

const PageHeader: FunctionComponent<Props> = ({ title, description }) => {
    return (
        <>
            <p className="text-center text-3xl font-bold text-wt-accent mt-3">{title}</p>
            {description &&
                <p className="text-center text-sm text-wt-accent-light mb-3">{description}</p>
            }
        </>
    );
};

export default PageHeader;