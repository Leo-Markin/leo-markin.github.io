import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { InlineMath, BlockMath } from 'react-katex';
import { formulas } from '../data/formulas';
import 'katex/dist/katex.min.css';

export const M = ({ m }: { m: string }) => <InlineMath math={m} />;
export const BM = ({ m }: { m: string }) => (
  <div className="overflow-x-auto overflow-y-hidden py-1 max-w-full">
    <BlockMath math={m} />
  </div>
);

export const FRef = ({ id, children, desc }: { id: string, children: React.ReactNode, desc?: string }) => {
  const tex = formulas[id];
  if (!tex) return <span className="text-red-500 font-bold">[{id} NOT FOUND]</span>;
  
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span className="border-b-2 border-dashed border-indigo-400 text-indigo-700 font-medium cursor-help hover:bg-indigo-50 px-1 rounded transition-colors inline-block my-0.5">
            {children}
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content 
            className="bg-white p-5 shadow-2xl rounded-2xl border border-slate-200 z-50 text-slate-800 max-w-xl outline-none select-text" 
            sideOffset={8}
            align="center"
          >
            {desc && <div className="text-sm font-semibold mb-3 text-slate-500 uppercase tracking-widest">{desc}</div>}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 overflow-x-auto">
              <BlockMath math={tex} />
            </div>
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code = ({ code }: { code: string }) => (
  <div className="my-6 rounded-2xl overflow-hidden shadow-lg border border-slate-800 text-sm">
    <SyntaxHighlighter 
      language="python" 
      style={vscDarkPlus} 
      customStyle={{ margin: 0, padding: '1.25rem', lineHeight: '1.5' }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
);
