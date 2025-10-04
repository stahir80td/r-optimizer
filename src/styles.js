// styles.js
export const styles = {
  body: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
    margin: 0,
    padding: 0
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#e5e5e5'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    borderBottom: '2px solid #3b82f6',
    paddingBottom: '20px'
  },
  title: {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0'
  },
  subtitle: {
    color: '#9ca3af',
    marginTop: '10px',
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  section: {
    background: 'linear-gradient(135deg, #1f1f1f, #2a2a2a)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #374151',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
  },
  sectionTitle: {
    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#e5e7eb'
  },
  fileInput: {
    marginBottom: '15px'
  },
  fileInputElement: {
    background: '#374151',
    color: '#e5e7eb',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #4b5563',
    width: '100%',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    minHeight: '200px',
    padding: '12px',
    border: '1px solid #4b5563',
    borderRadius: '8px',
    fontSize: '14px',
    resize: 'vertical',
    boxSizing: 'border-box',
    background: '#1f2937',
    color: '#e5e7eb',
    outline: 'none',
    transition: 'border-color 0.3s',
    fontFamily: 'monospace'
  },
  button: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)'
  },
  buttonTest: {
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: 'clamp(14px, 2.5vw, 16px)',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)'
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    cursor: 'pointer',
    marginRight: '10px',
    marginBottom: '10px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)'
  },
  editor: {
    border: '1px solid #4b5563',
    borderRadius: '8px',
    padding: '12px',
    minHeight: '120px',
    background: '#1f2937',
    color: '#e5e7eb',
    marginBottom: '15px',
    whiteSpace: 'pre-wrap',
    outline: 'none',
    fontSize: '14px',
    lineHeight: '1.6',
    fontFamily: 'monospace'
  },
  resultsSection: {
    background: 'linear-gradient(135deg, #1f1f1f, #2a2a2a)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    marginTop: '30px',
    border: '1px solid #374151'
  },
  scoreCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  scoreItem: {
    padding: '20px',
    background: 'linear-gradient(135deg, #1f2937, #374151)',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #4b5563',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  },
  scoreLabel: {
    fontSize: 'clamp(12px, 2vw, 14px)',
    color: '#9ca3af',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  scoreValue: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '10px'
  },
  skillChip: {
    background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
    color: '#e0e7ff',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 2vw, 14px)',
    border: '1px solid #3b82f6',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
  },
  missingChip: {
    background: 'linear-gradient(135deg, #7f1d1d, #991b1b)',
    color: '#fee2e2',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 2vw, 14px)',
    border: '1px solid #dc2626',
    boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#9ca3af'
  },
  error: {
    background: 'linear-gradient(135deg, #7f1d1d, #991b1b)',
    color: '#fee2e2',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #dc2626',
    boxShadow: '0 2px 4px rgba(220, 38, 38, 0.2)'
  },
  success: {
    background: 'linear-gradient(135deg, #14532d, #166534)',
    color: '#bbf7d0',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid #16a34a',
    boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)'
  },
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '30px'
  },
  subheading: {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    marginBottom: '20px',
    color: '#e5e7eb',
    fontWeight: '600'
  },
  editorLabel: {
    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
    marginBottom: '10px',
    color: '#d1d5db',
    fontWeight: '500'
  },
  warning: {
    background: 'linear-gradient(135deg, #7c2d12, #92400e)',
    color: '#fed7aa',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '14px',
    border: '1px solid #c2410c'
  },
  fileInput: {
    marginBottom: '15px',
  },
  
  fileInputElement: {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  
  // Make sure your main button style matches
  button: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    padding: '12px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
  },
  
  // And the Architecture button in App.js should be:
  architectureButton: {
    position: 'absolute',
    right: '20px',
    top: '20px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
  },
};