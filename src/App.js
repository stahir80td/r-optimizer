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
  const [applicationDocs, setApplicationDocs] = useState(null);
  const [editedSections, setEditedSections] = useState({
    executiveSummary: '',
    coreCompetencies: '',
    keyAchievements: '',
    technologiesLanguages: '',
    rewrittenExperience: ''
  });
  const [editedDocs, setEditedDocs] = useState({
    coverLetter: '',
    referralEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedSection, setExpandedSection] = useState('resume'); // resume, cover, email
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

  // Analyze resume - Step 1
  const analyzeResume = async () => {
    if (!resumeText || !jobDescription) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    setApplicationDocs(null); // Reset application docs when re-analyzing

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
      
      if (data.success && data.analysis) {
        analysisData = data.analysis;
      } else if (data.error) {
        setError(`API Error: ${data.error}`);
        return;
      } else if (data.partialData) {
        analysisData = data.partialData;
      }
      
      if (analysisData && (analysisData.matchScore !== undefined || analysisData.executiveSummary)) {
        setAnalysis(analysisData);
        
        setEditedSections({
          executiveSummary: analysisData.executiveSummary || '',
          coreCompetencies: Array.isArray(analysisData.coreCompetencies) 
            ? analysisData.coreCompetencies.map(c => `• ${c}`).join('\n') 
            : analysisData.coreCompetencies || '',
          keyAchievements: analysisData.keyAchievements || '',
          technologiesLanguages: analysisData.technologiesLanguages || '',
          rewrittenExperience: analysisData.rewrittenExperience || '// Last 2 positions will be rewritten here'
        });
        
        setSuccess('Resume analysis complete! You can now generate cover letter and referral email.');
        setExpandedSection('resume');
      } else {
        setError('The AI response was incomplete. Please try again.');
        console.error('Invalid analysis data structure:', data);
      }
    } catch (err) {
      setError('Network error. The service might be starting up (takes 30-60 seconds on first request). Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate Cover Letter and Referral Email - Step 2
  const generateApplicationDocs = async () => {
    if (!analysis) {
      setError('Please analyze resume first before generating application documents');
      return;
    }

    setLoadingDocs(true);
    setError('');
    setSuccess('');

    try {
      // Combine optimized resume sections into a single text
      const optimizedResume = `
        Executive Summary: ${editedSections.executiveSummary}
        Core Competencies: ${editedSections.coreCompetencies}
        Key Achievements: ${editedSections.keyAchievements}
        Technologies: ${editedSections.technologiesLanguages}
        Experience: ${editedSections.rewrittenExperience}
      `;

      const response = await fetch(
        'https://resume-optimizer-n8n.onrender.com/webhook/cover-letter-generator',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa('stahir80:stahir80'),
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            optimizedResume: optimizedResume,
            originalResume: resumeText,
            jobDescription: jobDescription,
            companyName: companyName || 'Hiring Team',
            roleName: roleName || 'this position',
            matchingSkills: analysis.matchingSkills || []
          })
        }
      );

      const data = await response.json();
      console.log('Application docs response:', data);
      
      if (data.success && data.documents) {
        setApplicationDocs(data.documents);
        setEditedDocs({
          coverLetter: data.documents.coverLetter || '',
          referralEmail: data.documents.referralEmail || ''
        });
        setSuccess('Cover letter and referral email generated successfully!');
        setExpandedSection('cover');
      } else {
        setError('Failed to generate application documents. Please try again.');
      }
    } catch (err) {
      setError('Network error generating documents. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoadingDocs(false);
    }
  };

  // Copy section to clipboard
  const copySectionToClipboard = (sectionName, content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(sectionName);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Resume Optimizer AI</h1>
        <p style={styles.subtitle}>Two-step process: Optimize resume, then generate application documents</p>
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
            placeholder="Company Name (required for cover letter)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <input
            style={{ ...styles.textarea, minHeight: '40px', marginBottom: '10px' }}
            placeholder="Role/Position Title"
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
          {loading ? 'Analyzing Resume... (30-60s)' : '🔍 Step 1: Analyze & Optimize Resume'}
        </button>
      </div>

      {loading && (
        <div style={styles.loading}>
          <p>🔍 Analyzing resume and generating optimized sections...</p>
          <p style={{ fontSize: '14px', marginTop: '10px' }}>
            This may take 30-60 seconds
          </p>
        </div>
      )}

      {analysis && (
        <>
          {/* Resume Optimization Results */}
          <div style={{ ...styles.resultsSection, marginBottom: '30px' }}>
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '20px',
                  cursor: 'pointer'
                }}
                onClick={() => setExpandedSection(expandedSection === 'resume' ? '' : 'resume')}
              >
                <h2 style={{ ...styles.subheading, marginRight: 'auto' }}>
                  {expandedSection === 'resume' ? '▼' : '▶'} Resume Optimization Results
                </h2>
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '15px',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  ...styles.scoreItem, 
                  flex: '1',
                  textAlign: 'center',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  borderRadius: '8px',
                  border: '1px solid #475569'
                }}>
                  <div style={styles.scoreLabel}>Match</div>
                  <div style={{ ...styles.scoreValue, fontSize: '28px', color: '#3b82f6' }}>{analysis.matchScore}%</div>
                </div>
                <div style={{ 
                  ...styles.scoreItem, 
                  flex: '1',
                  textAlign: 'center',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  borderRadius: '8px',
                  border: '1px solid #475569'
                }}>
                  <div style={styles.scoreLabel}>Skills Match</div>
                  <div style={{ ...styles.scoreValue, fontSize: '28px', color: '#3b82f6' }}>{analysis.matchingSkills?.length || 0}</div>
                </div>
                <div style={{ 
                  ...styles.scoreItem, 
                  flex: '1',
                  textAlign: 'center',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  borderRadius: '8px',
                  border: '1px solid #475569'
                }}>
                  <div style={styles.scoreLabel}>Gap Skills</div>
                  <div style={{ ...styles.scoreValue, fontSize: '28px', color: '#3b82f6' }}>{analysis.missingSkills?.length || 0}</div>
                </div>
              </div>
            </div>

            {expandedSection === 'resume' && (
              <div>
                <div style={styles.warning}>
                  💡 Edit sections below, then copy each section to update your resume
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
                    <h3 style={styles.editorLabel}>Optimized Experience (Last 2 Positions)</h3>
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
          </div>

          {/* Step 2: Generate Application Documents */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid #475569'
            }}>
              <h3 style={{ color: '#f3f4f6', marginBottom: '10px' }}>Ready for the next step?</h3>
              <p style={{ color: '#9ca3af', marginBottom: '20px' }}>
                Generate a tailored cover letter and referral email based on your optimized resume
              </p>
              <button
                style={{ ...styles.button, background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                onClick={generateApplicationDocs}
                disabled={loadingDocs}
              >
                {loadingDocs ? 'Generating Documents...' : '📝 Step 2: Generate Cover Letter & Referral Email'}
              </button>
            </div>
          </div>

          {loadingDocs && (
            <div style={styles.loading}>
              <p>✍️ Crafting personalized cover letter and referral email...</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                This may take 20-30 seconds
              </p>
            </div>
          )}

          {/* Application Documents */}
          {applicationDocs && (
            <>
              {/* Cover Letter */}
              <div style={{ ...styles.resultsSection, marginBottom: '30px' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpandedSection(expandedSection === 'cover' ? '' : 'cover')}
                >
                  <h2 style={styles.subheading}>
                    {expandedSection === 'cover' ? '▼' : '▶'} Cover Letter
                  </h2>
                </div>

                {expandedSection === 'cover' && (
                  <div>
                    <div style={styles.warning}>
                      💡 Personalized cover letter for {companyName || 'the company'} - {roleName || 'this role'}
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={styles.editorLabel}>Cover Letter</h3>
                        <button
                          onClick={() => copySectionToClipboard('cover', editedDocs.coverLetter)}
                          style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                        >
                          {copied === 'cover' ? '✓ Copied!' : '📋 Copy'}
                        </button>
                      </div>
                      <div
                        contentEditable
                        style={{ ...styles.editor, minHeight: '400px', whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: editedDocs.coverLetter }}
                        onBlur={(e) => setEditedDocs({
                          ...editedDocs,
                          coverLetter: e.target.innerText
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Referral Email */}
              <div style={styles.resultsSection}>
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setExpandedSection(expandedSection === 'email' ? '' : 'email')}
                >
                  <h2 style={styles.subheading}>
                    {expandedSection === 'email' ? '▼' : '▶'} Referral Email Template
                  </h2>
                </div>

                {expandedSection === 'email' && (
                  <div>
                    <div style={styles.warning}>
                      💡 Email template for employees at {companyName || 'the company'} to refer you
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={styles.editorLabel}>Referral Email</h3>
                        <button
                          onClick={() => copySectionToClipboard('email', editedDocs.referralEmail)}
                          style={{ ...styles.buttonSecondary, padding: '5px 10px', fontSize: '12px' }}
                        >
                          {copied === 'email' ? '✓ Copied!' : '📋 Copy'}
                        </button>
                      </div>
                      <div
                        contentEditable
                        style={{ ...styles.editor, minHeight: '350px', whiteSpace: 'pre-wrap' }}
                        dangerouslySetInnerHTML={{ __html: editedDocs.referralEmail }}
                        onBlur={(e) => setEditedDocs({
                          ...editedDocs,
                          referralEmail: e.target.innerText
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;