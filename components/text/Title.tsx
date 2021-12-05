import { FunctionComponent } from 'react';

interface Types {
  [key: string]: string;
}

interface Props {
  level: number;
  id?: string;
}

const Title: FunctionComponent<Props> = ({ level, id, children }) => {
  const levels: Types = {
    level1: 'text-center text-wt-accent text-4xl font-bold pt-2',
    level2: 'text-center text-wt-accent text-2xl font-bold pt-4',
    level3: 'text-center text-wt-accent text-xl font-bold',
    level4: 'text-wt-accent text-lg font-bold',
  };

  return (
    <p id={id} className={levels['level' + level]}>{children}</p>
  );
};

export default Title;
