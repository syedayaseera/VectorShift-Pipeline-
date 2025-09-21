import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--primary-50) 100%)',
      fontFamily: 'var(--font-family)'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid var(--gray-200)',
        boxShadow: 'var(--shadow-sm)',
        padding: 'var(--space-4) 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '700',
                color: 'var(--gray-800)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}>
                <span style={{ fontSize: '1.75rem' }}>⚡</span>
                VectorShift Pipeline Builder
              </h1>
              <p style={{
                margin: 'var(--space-1) 0 0 0',
                fontSize: '0.875rem',
                color: 'var(--gray-600)'
              }}>
                Build and execute data processing pipelines with drag-and-drop nodes
              </p>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)'
            }}>
              <div style={{
                padding: 'var(--space-2) var(--space-4)',
                background: 'var(--success-50)',
                color: 'var(--success-700)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: '1px solid var(--success-200)'
              }}>
                ✨ Ready to Build
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: 'var(--space-4) 0' }}>
        <div className="container">
          <PipelineToolbar />
          <PipelineUI />
        </div>
      </main>

      {/* Footer */}
      <SubmitButton />
    </div>
  );
}

export default App;
