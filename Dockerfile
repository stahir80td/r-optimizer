# Use official n8n image
FROM n8nio/n8n:latest

# Set environment variables
ENV N8N_PORT=10000
ENV N8N_PROTOCOL=http
ENV N8N_HOST=0.0.0.0
ENV WEBHOOK_URL=https://resume-optimizer-n8n.onrender.com

# Expose the port
EXPOSE 10000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/healthz', (r) => {r.statusCode === 200 ? process.exit(0) : process.exit(1)})" || exit 1

# Start n8n
CMD ["n8n", "start"]