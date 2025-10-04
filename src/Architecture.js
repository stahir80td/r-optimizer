import React, { useState } from 'react';
import { architectureStyles as styles } from './architectureStyles';

const Architecture = ({ onBack }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');

  const componentDescriptions = {
    frontend: "React-based UI with real-time updates and PDF/Word document processing capabilities",
    n8n: "Workflow automation platform orchestrating the entire AI pipeline",
    aiEngine: "Dual-path AI processing with Gemini for analysis and specialized models for optimization",
    contextEngine: "Advanced prompt engineering and context injection for targeted resume optimization",
    database: "Persistent storage for templates, analysis results, and user sessions",
    webhook: "RESTful API endpoints handling async processing and real-time responses"
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backButton}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>System Architecture</h1>
        <p style={styles.subtitle}>
          AI-Powered Resume Optimization Pipeline
        </p>
      </div>

      <div style={styles.viewSelector}>
        <button 
          style={{
            ...styles.viewButton,
            ...(selectedView === 'overview' ? styles.viewButtonActive : {})
          }}
          onClick={() => setSelectedView('overview')}
        >
          System Overview
        </button>
        <button 
          style={{
            ...styles.viewButton,
            ...(selectedView === 'flow' ? styles.viewButtonActive : {})
          }}
          onClick={() => setSelectedView('flow')}
        >
          Data Flow
        </button>
        <button 
          style={{
            ...styles.viewButton,
            ...(selectedView === 'tech' ? styles.viewButtonActive : {})
          }}
          onClick={() => setSelectedView('tech')}
        >
          Tech Stack
        </button>
      </div>

      {selectedView === 'overview' && (
        <div style={styles.diagramContainer}>
          <svg viewBox="0 0 1200 800" style={styles.svg}>
            <defs>
              <linearGradient id="bgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect width="1200" height="800" fill="url(#bgGradient)" />

            <g transform="translate(100, 50)">
              <rect 
                x="0" y="0" width="1000" height="150" 
                fill="#1e3a8a" fillOpacity="0.2" 
                stroke="#3b82f6" strokeWidth="2" rx="10"
              />
              <text x="500" y="30" style={styles.layerTitle}>CLIENT LAYER</text>
              
              <rect
                x="350" y="50" width="300" height="80"
                fill="#3b82f6" fillOpacity="0.9" rx="8"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredComponent('frontend')}
                onMouseLeave={() => setHoveredComponent(null)}
                filter="url(#glow)"
              />
              <text x="500" y="95" style={styles.componentText}>React + Vite Frontend</text>
              <text x="500" y="115" style={styles.componentSubtext}>Real-time State Management</text>
            </g>

            <g transform="translate(100, 250)">
              <rect 
                x="0" y="0" width="1000" height="200" 
                fill="#059669" fillOpacity="0.1" 
                stroke="#10b981" strokeWidth="2" rx="10"
              />
              <text x="500" y="30" style={styles.layerTitle}>PROCESSING LAYER</text>
              
              <rect
                x="350" y="50" width="300" height="120"
                fill="#10b981" fillOpacity="0.9" rx="8"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredComponent('n8n')}
                onMouseLeave={() => setHoveredComponent(null)}
                filter="url(#glow)"
              />
              <text x="500" y="90" style={styles.componentText}>N8N Workflow Engine</text>
              <text x="500" y="110" style={styles.componentSubtext}>• Webhook Triggers</text>
              <text x="500" y="130" style={styles.componentSubtext}>• Parallel Processing</text>
              <text x="500" y="150" style={styles.componentSubtext}>• Error Handling</text>
            </g>

            <g transform="translate(100, 500)">
              <rect 
                x="0" y="0" width="1000" height="200" 
                fill="#7c3aed" fillOpacity="0.1" 
                stroke="#a855f7" strokeWidth="2" rx="10"
              />
              <text x="500" y="30" style={styles.layerTitle}>INTELLIGENCE LAYER</text>
              
              <rect
                x="50" y="50" width="280" height="120"
                fill="#8b5cf6" fillOpacity="0.9" rx="8"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredComponent('aiEngine')}
                onMouseLeave={() => setHoveredComponent(null)}
                filter="url(#glow)"
              />
              <text x="190" y="90" style={styles.componentText}>AI Analysis Engine</text>
              <text x="190" y="110" style={styles.componentSubtext}>• Gemini Integration</text>
              <text x="190" y="130" style={styles.componentSubtext}>• Pattern Recognition</text>
              <text x="190" y="150" style={styles.componentSubtext}>• Skill Matching</text>

              <rect
                x="360" y="50" width="280" height="120"
                fill="#a855f7" fillOpacity="0.9" rx="8"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredComponent('contextEngine')}
                onMouseLeave={() => setHoveredComponent(null)}
                filter="url(#glow)"
              />
              <text x="500" y="90" style={styles.componentText}>Context Engineering</text>
              <text x="500" y="110" style={styles.componentSubtext}>• Prompt Optimization</text>
              <text x="500" y="130" style={styles.componentSubtext}>• Template Management</text>
              <text x="500" y="150" style={styles.componentSubtext}>• Response Structuring</text>

              <rect
                x="670" y="50" width="280" height="120"
                fill="#ec4899" fillOpacity="0.9" rx="8"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredComponent('database')}
                onMouseLeave={() => setHoveredComponent(null)}
                filter="url(#glow)"
              />
              <text x="810" y="90" style={styles.componentText}>Data Persistence</text>
              <text x="810" y="110" style={styles.componentSubtext}>• Session Storage</text>
              <text x="810" y="130" style={styles.componentSubtext}>• Template Library</text>
              <text x="810" y="150" style={styles.componentSubtext}>• Analytics Data</text>
            </g>

            <g>
              <line x1="600" y1="180" x2="600" y2="300" stroke="#3b82f6" strokeWidth="3" />
              <circle cx="600" cy="240" r="5" fill="#3b82f6" />
              
              <line x1="600" y1="420" x2="290" y2="550" stroke="#10b981" strokeWidth="2" />
              <line x1="600" y1="420" x2="600" y2="550" stroke="#10b981" strokeWidth="2" />
              <line x1="600" y1="420" x2="910" y2="550" stroke="#10b981" strokeWidth="2" />
            </g>

            {hoveredComponent && (
              <g transform="translate(100, 720)">
                <rect x="0" y="0" width="1000" height="60" fill="#1e293b" fillOpacity="0.95" rx="8" />
                <text x="20" y="35" style={{ ...styles.tooltipText, fontSize: '18px' }}>
                  {componentDescriptions[hoveredComponent]}
                </text>
              </g>
            )}
          </svg>
        </div>
      )}

      {selectedView === 'flow' && (
        <div style={styles.flowContainer}>
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>1</div>
            <h3 style={styles.flowTitle}>Document Upload</h3>
            <p style={styles.flowDescription}>
              User uploads resume (PDF/Word) and provides job description. 
              Client-side processing extracts text using PDF.js or Mammoth.js.
            </p>
          </div>
          
          <div style={styles.flowArrow}>→</div>
          
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>2</div>
            <h3 style={styles.flowTitle}>N8N Webhook Trigger</h3>
            <p style={styles.flowDescription}>
              Data sent to N8N workflow via webhook. Authentication verified, 
              request queued for processing with unique session ID.
            </p>
          </div>
          
          <div style={styles.flowArrow}>→</div>
          
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>3</div>
            <h3 style={styles.flowTitle}>AI Analysis Pipeline</h3>
            <p style={styles.flowDescription}>
              Parallel processing: skill extraction, gap analysis, keyword matching. 
              Context engineering ensures accurate, relevant optimization.
            </p>
          </div>
          
          <div style={styles.flowArrow}>→</div>
          
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>4</div>
            <h3 style={styles.flowTitle}>Content Generation</h3>
            <p style={styles.flowDescription}>
              Gemini generates optimized sections: executive summary, achievements, 
              competencies. Second pass creates cover letter and referral email.
            </p>
          </div>
          
          <div style={styles.flowArrow}>→</div>
          
          <div style={styles.flowStep}>
            <div style={styles.flowNumber}>5</div>
            <h3 style={styles.flowTitle}>Response Delivery</h3>
            <p style={styles.flowDescription}>
              Structured JSON response sent back to client. Real-time updates 
              displayed with editing capabilities for final customization.
            </p>
          </div>
        </div>
      )}

      {selectedView === 'tech' && (
        <div style={styles.techGrid}>
          <div style={styles.techCategory}>
            <h3 style={styles.techCategoryTitle}>Frontend</h3>
            <div style={styles.techItem}>
              <span style={styles.techName}>React 18</span>
              <span style={styles.techDescription}>UI Framework</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Vite</span>
              <span style={styles.techDescription}>Build Tool</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>PDF.js</span>
              <span style={styles.techDescription}>PDF Processing</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Mammoth.js</span>
              <span style={styles.techDescription}>Word Processing</span>
            </div>
          </div>

          <div style={styles.techCategory}>
            <h3 style={styles.techCategoryTitle}>Backend</h3>
            <div style={styles.techItem}>
              <span style={styles.techName}>N8N</span>
              <span style={styles.techDescription}>Workflow Automation</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Node.js</span>
              <span style={styles.techDescription}>Runtime</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Webhook API</span>
              <span style={styles.techDescription}>REST Endpoints</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Basic Auth</span>
              <span style={styles.techDescription}>Security</span>
            </div>
          </div>

          <div style={styles.techCategory}>
            <h3 style={styles.techCategoryTitle}>AI & ML</h3>
            <div style={styles.techItem}>
              <span style={styles.techName}>Gemini</span>
              <span style={styles.techDescription}>Language Model</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>OpenAI API</span>
              <span style={styles.techDescription}>AI Service</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Context Engineering</span>
              <span style={styles.techDescription}>Prompt Design</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>NLP Pipeline</span>
              <span style={styles.techDescription}>Text Analysis</span>
            </div>
          </div>

          <div style={styles.techCategory}>
            <h3 style={styles.techCategoryTitle}>Infrastructure</h3>
            <div style={styles.techItem}>
              <span style={styles.techName}>Render.com</span>
              <span style={styles.techDescription}>Hosting</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>Docker</span>
              <span style={styles.techDescription}>Containerization</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>GitHub Actions</span>
              <span style={styles.techDescription}>CI/CD</span>
            </div>
            <div style={styles.techItem}>
              <span style={styles.techName}>PostgreSQL?</span>
              <span style={styles.techDescription}>Database</span>
            </div>
          </div>
        </div>
      )}

      <div style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>How AI & Context Engineering Solve Real Problems</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Intelligent Skill Matching</h3>
            <p style={styles.featureDescription}>
              AI analyzes job descriptions to identify key requirements and automatically 
              maps them to your experience, ensuring no critical skill is missed.
            </p>
          </div>
          
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔄</div>
            <h3 style={styles.featureTitle}>Automated Workflow</h3>
            <p style={styles.featureDescription}>
              N8N orchestrates complex multi-step processes: document parsing, AI analysis, 
              content generation, and response formatting - all in parallel for speed.
            </p>
          </div>
          
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🧠</div>
            <h3 style={styles.featureTitle}>Context-Aware Generation</h3>
            <p style={styles.featureDescription}>
              Advanced prompt engineering ensures AI understands industry context, 
              company culture, and role requirements to create truly personalized content.
            </p>
          </div>
          
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Real-Time Optimization</h3>
            <p style={styles.featureDescription}>
              Instant feedback loop allows users to edit and refine AI suggestions, 
              combining machine intelligence with human expertise for best results.
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Architecture;