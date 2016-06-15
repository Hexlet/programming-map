FROM node:5.11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
RUN npm install

# RUN npm install -g node-sass
COPY . /usr/src/app

# RUN make generate_assets
# ENV DEBIAN_FRONTEND noninteractive
# RUN npm install -g gulp

# RUN npm install
# RUN gulp production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["make", "start"]
