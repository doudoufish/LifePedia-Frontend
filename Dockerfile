FROM nginx:1.22.0-alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/mime.types /etc/nginx/mime.types

COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
