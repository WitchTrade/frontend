import { FunctionComponent } from 'react';
import Image from 'next/image';

interface Props {
  name: string;
  value: string;
  boldValue?: boolean;
  link?: boolean;
  svgPath?: string;
}

const ValueDisplay: FunctionComponent<Props> = ({ name, value, boldValue, link, svgPath }) => {

  return (
    <div className="flex justify-between h-11 rounded-lg bg-wt-surface-dark items-center px-2">
      <div className="flex items-center">
        {svgPath &&
          <Image src={svgPath} height="24px" width="24px" alt="Value Icon" />
        }
        <p className="ml-1">{name}:</p>
      </div>
      {link && value &&
        <a className="hover:underline text-wt-accent-light rounded-md focus:outline-none focus:ring-2 focus:ring-wt-accent" href={value} target="_blank" rel="noreferrer">click here</a>
        ||
        <p className={value && boldValue ? 'font-bold' : ''}>{value ? value : 'Not set'}</p>
      }
    </div >
  );
};

export default ValueDisplay;
