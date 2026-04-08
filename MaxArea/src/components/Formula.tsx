import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface FormulaProps {
  tex: string;
  block?: boolean;
  className?: string;
}

export const Formula: React.FC<FormulaProps> = ({ tex, block = false, className = "" }) => {
  return (
    <span className={`inline-block ${className}`}>
      {block ? (
        <BlockMath math={tex} />
      ) : (
        <InlineMath math={tex} />
      )}
    </span>
  );
};
