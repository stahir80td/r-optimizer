FROM n8nio/n8n:latest
ENV N8N_PORT=10000
ENV PORT=10000
ENV N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=false
EXPOSE 10000
# Let the image use its default entrypoint
ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]