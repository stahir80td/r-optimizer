import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { styles } from './styles';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const App = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [roleName, setRoleName] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [editedSections, setEditedSections] = useState({
    executiveSummary: '',
    coreCompetencies: '',
    keyAchievements: '',
    technologiesLanguages: '',
    rewrittenExperience: '',
    coverLetter: '',
    referralEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('sections'); // sections, cover, email
  const fileInputRef = useRef(null);

  // Apply dark background to body
  React.useEffect(() => {
    document.body.style.background = 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)';
    document.body.style.minHeight = '100vh';
    document.body.style.margin = '0';
    return () => {
      document.body.style.background = '';
      document.body.style.minHeight = '';
      document.body.style.margin = '';
    };
  }, []);

  // File handling for both PDF and Word
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError('');
    setSuccess('');
    const fileType = file.name.split('.').pop().toLowerCase();

    try {
      let text = '';
      
      if (fileType === 'pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map(item => item.str).join(' ');
          text += pageText + '\n';
        }
      } else if (fileType === 'docx' || fileType === 'doc') {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else {
        setError('Please upload a PDF or Word document');
        return;
      }
      
      setResumeText(text);
      setSuccess(`File loaded: ${file.name}`);
    } catch (err) {
      setError('Error reading file: ' + err.message);
    }
  };

  // Updated analyzeResume function with better error handling
  const analyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        'https://resume-optimizer-n8n.onrender.com/webhook/e6e48ef3-0a1c-4d6d-9511-dbbad1c936f6',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('stahir80:stahir80'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            resume: resumeText,
            jobDescription: jobDescription,
            companyName: companyName || 'the company',
            roleName: roleName || 'this role'
          })
        }
      );

      const data = await response.json();
      console.log('Raw API response:', data);
      
      let analysisData = null;
      
      // Check if we have a successful response with analysis data
      if (data.success && data.analysis) {
        analysisData = data.analysis;
      } else if (data.error) {
        // Handle error response from API
        setError(`API Error: ${data.error}`);
        return;
      } else if (data.partialData) {
        // Try to use partial data if available
        analysisData = data.partialData;
      }
      
      // Validate we have the minimum required fields
      if (analysisData && (analysisData.matchScore !== undefined || analysisData.executiveSummary)) {
        setAnalysis(analysisData);
        
        // Set the sections with the parsed data - fixed character encoding
        setEditedSections({
          executiveSummary: analysisData.executiveSummary || '',
          coreCompetencies: Array.isArray(analysisData.coreCompetencies) 
            ? analysisData.coreCompetencies.map(c => `• ${c}`).join('\n') 
            : analysisData.coreCompetencies || '',
          keyAchievements: analysisData.keyAchievements || '',
          technologiesLanguages: analysisData.technologiesLanguages || '',
          rewrittenExperience: analysisData.rewrittenExperience || '// Last 2 positions will be rewritten here',
          coverLetter: analysisData.coverLetter || '',
          referralEmail: analysisData.referralEmail || ''
        });
        
        setSuccess('Analysis complete! Navigate tabs to see all generated content.');
      } else {
        // Fallback error message
        setError('The AI response was incomplete. Please try again or check your n8n workflow.');
        console.error('Invalid analysis data structure:', data);
      }
    } catch (err) {
      setError('Network error. The service might be starting up (takes 30-60 seconds on first request). Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Copy section to clipboard
  const copySectionToClipboard = (sectionName, content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(sectionName);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Tab styles
  const tabStyles = {
    container: {
      display: 'flex',
      gap: '10px',
      marginBottom: '30px',
      borderBottom: '2px solid #374151',
      paddingBottom: '0'
    },
    tab: {
      padding: '12px 24px',
      background: 'transparent',
      color: '#9ca3af',
      border: 'none',
      borderBottom: '3px solid transparent',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'all 0.3s'
    },
    activeTab: {
      color: '#3b82f6',
      borderBottom: '3px solid #3b82f6',
      background: 'linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.1))'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Resume Optimizer AI</h1>
        <p style={styles.subtitle}>Complete job application toolkit - Resume, Cover Letter, and Referral Email</p>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}

      <div style={styles.grid}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📄 Upload Resume</h2>
          <div style={styles.fileInput}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              style={styles.fileInputElement}
            />
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
              Supports PDF and Word documents
            </p>
          </div>
          <textarea
            style={styles.textarea}
            placeholder="Or paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>💼 Job Details</h2>
          <input
            style={{ ...styles.textarea, minHeight: '40px', marginBottom: '10px' }}
            placeholder="Company Name (optional)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            style={{ ...styles.textarea, minHeight: '40px', marginBottom: '10px' }}
            placeholder="Role/Position Title (optional)"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <textarea
            style={styles.textarea}
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          style={styles.button}
          onClick={analyzeResume}
          disabled={loading}
        >
          {loading ? 'Analyzing... (may take 30-60s on first run)' : '🚀 Generate Application Package'}
        </button>
      </div>

      {loading && (
        <div style={styles.loading}>
          <p>🔍 Analyzing and generating content...</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            This may take 30-60 seconds on first request
          </p>
        </div>
      )}

      {analysis && (
        <div style={styles.resultsSection}>
          <h2 style={styles.subheading}>Application Package Ready</h2>

          <div style={styles.scoreCard}>
            <div style={styles.scoreItem}>
              <div style={styles.scoreLabel}>Match Score</div>
              <div style={styles.scoreValue}>{analysis.matchScore}%</div>
            </div>
            <div style={styles.scoreItem}>
              <div style={styles.scoreLabel}>Matching Skills</div>
              <div style={styles.scoreValue}>{analysis.matchingSkills?.length || 0}</div>
            </div>
            <div style={styles.scoreItem}>
              <div style={styles.scoreLabel}>Missing Skills</div>
              <div style={styles.scoreValue}>{analysis.missingSkills?.length || 0}</div>
            </div>
          </div>

          {/* Tabs */}
          <div style={tabStyles.container}>
            <button
              style={{ ...tabStyles.tab, ...(activeTab === 'sections' ? tabStyles.activeTab : {}) }}
              onClick={() => setActiveTab('sections')}
            >
              📝 Resume Sections
            </button>
            <button
              style={{ ...tabStyles.tab, ...(activeTab === 'cover' ? tabStyles.activeTab : {}) }}
              onClick={() => setActiveTab('cover')}
            >
              📄 Cover Letter
            </button>
            <button
              style={{ ...tabStyles.tab, ...(activeTab === 'email' ? tabStyles.activeTab : {}) }}
              onClick={() => setActiveTab('email')}
            >
              ✉️ Referral Email
            </button>
          </div>

          {/* Resume Sections Tab */}
          {activeTab === 'sections' && (
            <div>
              <div style={styles.warning}>
                💡 Edit sections below, then copy each section and paste into your resume document.
              </div>

              {/* Executive Summary */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Executive Summary</h3>
                  <button
                    onClick={() => copySectionToClipboard('summary', editedSections.executiveSummary)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'summary' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={styles.editor}
                  dangerouslySetInnerHTML={{ __html: editedSections.executiveSummary }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    executiveSummary: e.target.innerText
                  })}
                />
              </div>

              {/* Core Competencies */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Core Competencies</h3>
                  <button
                    onClick={() => copySectionToClipboard('competencies', editedSections.coreCompetencies)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'competencies' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={styles.editor}
                  dangerouslySetInnerHTML={{ __html: editedSections.coreCompetencies }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    coreCompetencies: e.target.innerText
                  })}
                />
              </div>

              {/* Key Achievements */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Key Achievements</h3>
                  <button
                    onClick={() => copySectionToClipboard('achievements', editedSections.keyAchievements)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'achievements' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={styles.editor}
                  dangerouslySetInnerHTML={{ __html: editedSections.keyAchievements }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    keyAchievements: e.target.innerText
                  })}
                />
              </div>

              {/* Technologies & Languages */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Technologies & Languages</h3>
                  <button
                    onClick={() => copySectionToClipboard('tech', editedSections.technologiesLanguages)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'tech' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={styles.editor}
                  dangerouslySetInnerHTML={{ __html: editedSections.technologiesLanguages }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    technologiesLanguages: e.target.innerText
                  })}
                />
              </div>

              {/* Rewritten Experience */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Rewritten Experience (Last 2 Positions)</h3>
                  <button
                    onClick={() => copySectionToClipboard('experience', editedSections.rewrittenExperience)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'experience' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={{ ...styles.editor, minHeight: '200px' }}
                  dangerouslySetInnerHTML={{ __html: editedSections.rewrittenExperience }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    rewrittenExperience: e.target.innerText
                  })}
                />
              </div>
            </div>
          )}

          {/* Cover Letter Tab */}
          {activeTab === 'cover' && (
            <div>
              <div style={styles.warning}>
                💡 Personalized cover letter highlighting your fit for {companyName || 'the company'} and {roleName || 'this role'}.
              </div>
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Cover Letter</h3>
                  <button
                    onClick={() => copySectionToClipboard('cover', editedSections.coverLetter)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'cover' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={{ ...styles.editor, minHeight: '400px' }}
                  dangerouslySetInnerHTML={{ __html: editedSections.coverLetter }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    coverLetter: e.target.innerText
                  })}
                />
              </div>
            </div>
          )}

          {/* Referral Email Tab */}
          {activeTab === 'email' && (
            <div>
              <div style={styles.warning}>
                💡 Email template for internal referral. Share with employees at {companyName || 'the company'} to forward to HR/Hiring Manager.
              </div>
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={styles.editorLabel}>Referral Email Template</h3>
                  <button
                    onClick={() => copySectionToClipboard('email', editedSections.referralEmail)}
                    style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                  >
                    {copied === 'email' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                <div
                  contentEditable
                  style={{ ...styles.editor, minHeight: '350px' }}
                  dangerouslySetInnerHTML={{ __html: editedSections.referralEmail }}
                  onBlur={(e) => setEditedSections({
                    ...editedSections,
                    referralEmail: e.target.innerText
                  })}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;