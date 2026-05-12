import React from 'react';
import * as Popover from '@radix-ui/react-popover';
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
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="border-b-2 border-dashed border-indigo-400 text-indigo-700 font-medium cursor-pointer hover:bg-indigo-50 px-1 rounded transition-colors inline-block my-0.5" aria-label={`View formula ${id}`}>
          {children}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content 
          className="bg-white p-5 shadow-2xl rounded-2xl border border-slate-200 z-50 text-slate-800 max-w-[90vw] sm:max-w-xl outline-none select-text animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95" 
          sideOffset={8}
          align="center"
          collisionPadding={16}
        >
          {desc && <div className="text-sm font-semibold mb-3 pr-6 text-slate-500 uppercase tracking-widest">{desc}</div>}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 overflow-x-auto">
            <BlockMath math={tex} />
          </div>
          <Popover.Arrow className="fill-white" />
          <Popover.Close className="absolute top-4 right-4 w-6 h-6 inline-flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-colors" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
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
