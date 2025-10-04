FROM n8nio/n8n:latest

EXPOSE 5678

USER root
RUN mkdir -p /home/node/.n8n && chown -R node:node /home/node/.n8n
USER node

ENTRYPOINT ["n8n", "start"]