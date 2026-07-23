// src/App.tsx
import { BuilderProvider } from './context/BuilderContext';
import { MainLayout } from './components/layouts/MainLayout';
import { Builder } from './components/builder/Builder';
import { ReviewPanel } from './components/review/ReviewPanel';

function App() {
  return (
    <BuilderProvider>
      <MainLayout>
        <Builder />
        <ReviewPanel />
      </MainLayout>
    </BuilderProvider>
  );
}

export default App;



