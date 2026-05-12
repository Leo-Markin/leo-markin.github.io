import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Intro } from './pages/Intro';
import { MathModel } from './pages/MathModel';
import { Integral } from './pages/Integral';
import { Numerical } from './pages/Numerical';
import { CodeGeom } from './pages/CodeGeom';
import { CodeKernel } from './pages/CodeKernel';
import { CodeBroadcasting } from './pages/CodeBroadcasting';
import { CodeSolve } from './pages/CodeSolve';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="math-model" element={<MathModel />} />
          <Route path="integral" element={<Integral />} />
          <Route path="numerical" element={<Numerical />} />
          <Route path="code-geom" element={<CodeGeom />} />
          <Route path="code-kernel" element={<CodeKernel />} />
          <Route path="code-broadcasting" element={<CodeBroadcasting />} />
          <Route path="code-solve" element={<CodeSolve />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
