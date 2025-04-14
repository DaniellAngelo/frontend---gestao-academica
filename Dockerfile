# Usa imagem oficial do Nginx
FROM nginx:alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia seus arquivos para a pasta do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80
