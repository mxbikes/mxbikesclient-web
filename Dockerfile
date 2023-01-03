# nodejs 19.0.0 as base image
FROM node:19

# create workspace
WORKDIR /app
COPY package.json .

# install npm package
run npm install;

# copy rest of directory files
COPY . .

# set port as envirment variable
EXPOSE 3000

# start app
CMD ["npm", "start"]