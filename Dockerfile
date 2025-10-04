FROM n8nio/n8n:latest

USER root
RUN mkdir -p /home/node/.n8n && chown -R node:node /home/node/.n8n
USER node

# Use Render's PORT variable
ENV N8N_PORT=10000
ENV PORT=10000

EXPOSE 10000

# Start n8n without tunnel mode for Render
CMD ["n8n", "start", "--port", "10000", "--host", "0.0.0.0"]