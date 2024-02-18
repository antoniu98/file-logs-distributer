# file-logs-distributer

## Prereqs:

- Nodejs installed. For installation check [official page](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- Run in root folder: `npm i`
- Set according env variables for reader/writer AND mongodb vars

## Start reader:

- Run in root folder: `npm run reader`
- Reader will read the last line from the file set in `INPUT_FILE` var in `.env`

## Start writer:

- Run in root folder: `npm run writer`
- Writer will append to the file set in `OUTPUT_FILE` var in `.env`
