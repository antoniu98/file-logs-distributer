# file-logs-distributer

## Prereqs:

- Nodejs installed. For installation check [official page](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- Run in root folder: `npm i`
- Setup `MongoDB`:

  - Create a free mongodb account ([link](https://www.mongodb.com/cloud/atlas/register))
  - Create a (free version) [shared](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup) cluster
  - Create a [database](https://www.mongodb.com/basics/create-database) and add the database name to the `.env` file
  - Create a [collection](https://www.mongodb.com/docs/compass/current/collections/) and add the collection name to the `.env` file
  - Create a [user](https://www.mongodb.com/docs/manual/tutorial/create-users/). You can also create a dedicated user for reader/writer
  - Get your [MongoDB URI](https://www.mongodb.com/basics/mongodb-connection-string#:~:text=How%20to%20get%20your%20MongoDB,connection%20string%20for%20your%20cluster) and add it in the `.env` file
  - Whitelist your IP addresses [link](https://www.mongodb.com/docs/atlas/security/ip-access-list/)

- Set according `env variables` for reader/writer AND `MongoDB` vars as described above

## Start reader:

- Run in root folder: `npm run reader`
- Reader will read the last line from the file set in `INPUT_FILE` var in `.env`

## Start writer:

- Run in root folder: `npm run writer`
- Writer will append to the file set in `OUTPUT_FILE` var in `.env`
