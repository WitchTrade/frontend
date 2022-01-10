import { SpecialComponents } from 'react-markdown/lib/ast-to-react';
import { NormalComponents } from 'react-markdown/lib/complex-types';

export const MarkdownComponents: Partial<Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents> = {
  img: ({ src }) => <p>{src}</p>,
  a: ({ href }) => <p>{href}</p>,
  h1: ({ children }) => {
    if (!children) {
      return <h1></h1>;
    }
    if (children.toString().startsWith('[c]')) {
      return <h1 className="text-center">{children.toString().substring(3)}</h1>;
    } else {
      return <h1>{children}</h1>;
    }
  },
  h2: ({ children }) => {
    if (!children) {
      return <h2></h2>;
    }
    if (children.toString().startsWith('[c]')) {
      return <h2 className="text-center">{children.toString().substring(3)}</h2>;
    } else {
      return <h2>{children}</h2>;
    }
  },
  h3: ({ children }) => {
    if (!children) {
      return <h3></h3>;
    }
    if (children.toString().startsWith('[c]')) {
      return <h3 className="text-center">{children.toString().substring(3)}</h3>;
    } else {
      return <h3>{children}</h3>;
    }
  },
  p: ({ children }) => {
    if (!children) {
      return <p></p>;
    }
    if (children.toString().startsWith('[c]')) {
      return <p className="text-center">{children.toString().substring(3)}</p>;
    } else {
      return <p>{children}</p>;
    }
  }
};
