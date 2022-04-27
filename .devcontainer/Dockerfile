ARG VARIANT="18"
FROM node:${VARIANT}

RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends gnupg vim

ADD https://dl-ssl.google.com/linux/linux_signing_key.pub keys/
RUN cat keys/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get -y install --no-install-recommends google-chrome-stable

RUN npm install -g @angular/cli
