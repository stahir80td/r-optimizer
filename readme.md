# Resume Optimizer with n8n Automation

A full-stack application that leverages n8n workflow automation to optimize resumes using AI, built with React and deployed on Render.

🚀 **Live Demo**: https://resume-optimizer-ui.onrender.com/

## Architecture Overview

This project demonstrates the power of n8n as a workflow automation platform for building AI-powered applications without traditional backend development.

### n8n Workflow Engine

The core of this application is built on **n8n**, an open-source workflow automation tool that provides:

- **Visual Workflow Builder**: Create complex automation flows without writing backend code
- **Webhook Endpoints**: Automatically generated REST API endpoints for each workflow
- **AI Integration**: Native support for OpenAI, Claude, and other AI providers
- **Error Handling**: Built-in retry logic and error management
- **Authentication**: Basic auth and API key support out of the box
- **Scalability**: Handles concurrent requests with queue management

### Why n8n?

Instead of building a traditional Node.js/Python backend, this project uses n8n for several advantages:

1. **Rapid Development**: Visual workflows are faster to build and modify than traditional code
2. **No Server Management**: n8n handles all the infrastructure complexity
3. **Built-in Integrations**: Connect to 400+ services without writing API integrations
4. **Version Control**: Workflows are JSON-exportable and Git-friendly
5. **Self-Hosted**: Full control over data and deployment
6. **Cost-Effective**: Single n8n instance can handle multiple workflows/projects

## Technical Stack

- **Frontend**: React 18 with vanilla JavaScript
- **Workflow Automation**: n8n (self-hosted on Render)
- **AI Processing**: OpenAI GPT-4 via n8n nodes
- **Document Processing**: PDF.js and Mammoth.js for file parsing
- **Deployment**: Render (Docker for n8n, Static Site for React)
- **Keep-Alive**: GitHub Actions cron jobs

## n8n Workflows

The project includes two main n8n workflows:

### 1. Resume Analysis Workflow
- **Endpoint**: `/webhook/e6e48ef3-0a1c-4d6d-9511-dbbad1c936f6`
- **Process**:
  - Receives resume and job description via webhook
  - Parses and structures the data
  - Sends to AI for analysis
  - Returns optimization suggestions and match scores

### 2. Cover Letter Generation Workflow  
- **Endpoint**: `/webhook/cover-letter-generator`
- **Process**:
  - Takes optimized resume sections
  - Generates personalized cover letter
  - Creates referral email template
  - Returns formatted documents

## Deployment

### n8n Instance (Docker on Render)
```dockerfile
FROM n8nio/n8n:latest
ENV N8N_PORT=10000
ENV PORT=10000
ENV N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false
EXPOSE 10000
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]
```

The n8n instance runs as a web service on Render, providing:
- Persistent workflow storage
- Webhook endpoints
- Web-based workflow editor
- API authentication

### Frontend (Static Site on Render)
- Build Command: `npm run build`
- Publish Directory: `build`
- Auto-deploys from GitHub

## Keep-Alive Strategy

Free tier Render services spin down after 15 minutes of inactivity. We use GitHub Actions to keep services warm:

```yaml
- cron: '*/13 * * * *'  # Ping every 13 minutes
```

## n8n Best Practices Demonstrated

1. **Webhook Security**: Basic auth on all endpoints
2. **Error Handling**: Try-catch nodes with fallback responses  
3. **Data Validation**: Input validation before AI processing
4. **Response Formatting**: Consistent JSON structure
5. **Logging**: Built-in execution history for debugging

## Local Development

```bash
# Install dependencies
npm install

# Start React development server
npm start

# n8n runs on Render - webhooks available immediately
```

## Environment Variables

Frontend uses build-time variable:
```bash
REACT_APP_N8N_URL=https://resume-optimizer-n8n.onrender.com
```

## Project Structure

```
/
├── src/
│   ├── App.js        # Main React component
│   ├── index.js      # React entry point
│   └── styles.js     # Styling configuration
├── public/
│   └── index.html    # HTML template
├── n8n-workflows/    # Exported n8n workflows (JSON)
├── Dockerfile        # n8n deployment config
└── package.json      # Dependencies and scripts
```

## Why This Architecture?

This project showcases how n8n can replace traditional backend development for AI-powered applications:

- **No API Routes**: n8n webhooks eliminate Express/FastAPI setup
- **No Database**: n8n handles state management internally
- **No AI SDK**: n8n nodes abstract AI provider APIs
- **No Queue System**: Built-in execution queue
- **Visual Debugging**: See exactly where workflows fail
- **Instant Updates**: Modify workflows without redeploying code

## Resources

- [n8n Documentation](https://docs.n8n.io)
- [n8n Workflow Examples](https://n8n.io/workflows)
- [Render Deployment Guide](https://render.com/docs)

## License

MIT