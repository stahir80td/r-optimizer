export const architectureStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    position: 'relative',
    padding: '0 10px',
  },
  
  backButton: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    '@media (max-width: 768px)': {
      fontSize: '12px',
      padding: '6px 12px',
    }
  },
  
  title: {
    fontSize: 'clamp(28px, 8vw, 48px)',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '10px',
    marginTop: '40px',
  },
  
  subtitle: {
    color: '#9ca3af',
    fontSize: 'clamp(14px, 3vw, 18px)',
  },
  
  viewSelector: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    padding: '0 10px',
  },
  
  viewButton: {
    background: 'transparent',
    color: '#9ca3af',
    border: '1px solid #374151',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '120px',
    '@media (max-width: 480px)': {
      padding: '8px 16px',
      fontSize: '12px',
      minWidth: '100px',
    }
  },
  
  viewButtonActive: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: '#fff',
    border: '1px solid transparent',
  },
  
  diagramContainer: {
    maxWidth: '1200px',
    margin: '0 auto 60px',
    background: '#0f172a',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #1e293b',
    overflowX: 'auto',
    '@media (max-width: 768px)': {
      padding: '10px',
      margin: '0 auto 40px',
    }
  },
  
  svg: {
    width: '100%',
    height: 'auto',
    minWidth: '800px',
  },
  
  layerTitle: {
    fill: '#94a3b8',
    fontSize: '14px',
    fontWeight: 'bold',
    textAnchor: 'middle',
    letterSpacing: '2px',
  },
  
  componentText: {
    fill: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    textAnchor: 'middle',
  },
  
  componentSubtext: {
    fill: '#e2e8f0',
    fontSize: '12px',
    textAnchor: 'middle',
  },
  
  tooltipText: {
    fill: '#cbd5e1',
    fontSize: '14px',
  },
  
  flowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '60px',
    padding: '40px 20px',
    background: '#0f172a',
    borderRadius: '16px',
    border: '1px solid #1e293b',
    overflowX: 'auto',
    flexWrap: 'wrap',
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
      gap: '30px',
    },
    '@media (max-width: 768px)': {
      padding: '20px 10px',
      marginBottom: '40px',
    }
  },
  
  flowStep: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    padding: '20px',
    borderRadius: '12px',
    width: '180px',
    minWidth: '160px',
    textAlign: 'center',
    border: '1px solid #475569',
    '@media (max-width: 768px)': {
      width: '90%',
      maxWidth: '300px',
    }
  },
  
  flowNumber: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 auto 15px',
  },
  
  flowTitle: {
    color: '#f3f4f6',
    fontSize: '16px',
    marginBottom: '10px',
  },
  
  flowDescription: {
    color: '#9ca3af',
    fontSize: '12px',
    lineHeight: '1.5',
  },
  
  flowArrow: {
    color: '#3b82f6',
    fontSize: '24px',
    fontWeight: 'bold',
    '@media (max-width: 1024px)': {
      transform: 'rotate(90deg)',
    }
  },
  
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '15px',
      marginBottom: '40px',
    }
  },
  
  techCategory: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #334155',
    '@media (max-width: 768px)': {
      padding: '20px',
    }
  },
  
  techCategoryTitle: {
    color: '#3b82f6',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  
  techItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #1e293b',
    flexWrap: 'wrap',
    gap: '5px',
  },
  
  techName: {
    color: '#f3f4f6',
    fontWeight: '600',
    fontSize: '14px',
  },
  
  techDescription: {
    color: '#6b7280',
    fontSize: '13px',
  },
  
  featuresSection: {
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      marginBottom: '40px',
    }
  },
  
  sectionTitle: {
    fontSize: 'clamp(24px, 5vw, 32px)',
    fontWeight: 'bold',
    color: '#f3f4f6',
    textAlign: 'center',
    marginBottom: '40px',
    padding: '0 10px',
    '@media (max-width: 768px)': {
      marginBottom: '30px',
    }
  },
  
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '0 10px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '15px',
    }
  },
  
  featureCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    padding: '30px',
    borderRadius: '12px',
    border: '1px solid #475569',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '@media (max-width: 768px)': {
      padding: '20px',
    }
  },
  
  featureIcon: {
    fontSize: 'clamp(36px, 8vw, 48px)',
    marginBottom: '20px',
  },
  
  featureTitle: {
    color: '#f3f4f6',
    fontSize: 'clamp(18px, 3vw, 20px)',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  
  featureDescription: {
    color: '#9ca3af',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  
  metricsSection: {
    marginBottom: '60px',
    '@media (max-width: 768px)': {
      marginBottom: '40px',
    }
  },
  
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    padding: '0 10px',
    '@media (max-width: 480px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '15px',
    }
  },
  
  metricCard: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    padding: '30px 20px',
    borderRadius: '12px',
    textAlign: 'center',
    '@media (max-width: 768px)': {
      padding: '20px 15px',
    }
  },
  
  metricValue: {
    color: '#fff',
    fontSize: 'clamp(24px, 5vw, 36px)',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  
  metricLabel: {
    color: '#e0e7ff',
    fontSize: 'clamp(11px, 2vw, 14px)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};