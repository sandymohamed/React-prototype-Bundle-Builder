// src/App.tsx
import { BuilderProvider } from './context/BuilderContext';
// Make sure these components exist or create placeholder components
import { MainLayout } from './layouts/MainLayout';
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