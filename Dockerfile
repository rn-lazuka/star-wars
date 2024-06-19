FROM node:21.5.0
ENV HOME /opt/app-service
ARG APP_ENV_ARG
ENV APP_ENV $APP_ENV_ARG

WORKDIR $HOME

COPY ./package.json $HOME/
COPY ./yarn.lock $HOME/

RUN set -x && \
    yarn && \
    yarn global add typescript tsc ts-node && \
    yarn cache clean && \
    node --version && \
    yarn --version && \
    ts-node --version && \
    tsc -v

RUN set -x && \
    npm install openssl openssl-nodejs

COPY . $HOME/

RUN set -x && \
    cp $HOME/.env.$APP_ENV $HOME/.env && \
    cat $HOME/.env && \
    yarn run build

EXPOSE 3000
CMD ["yarn", "run", "prod"]
# CMD ["yarn", "run", "start", "-p", "3000", "-H", "0.0.0.0"]
