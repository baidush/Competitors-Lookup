# Serverless Nodejs Rest API with TypeScript And MongoDB Atlas

This is simple REST API example for AWS Lambda By Serverless framwork with TypeScript and MongoDB Atlas.

## Use Cases

* REST API with typescript
* MongoDB Atlas data storage
* Multi-environment management under Serverless
* Mocha unit tests and lambda-tester interface test
* AWS lambda function log view

## Install Serverless
```bash
npm i -g serverless
```
## Create openAI API key

```
Put the key in ./config/.env.dev file
OPENAI_API_KEY=your api key
```

## Invoke the function locally

```bash
serverless invoke local --function find
```

## Deploy

### To Test It Locally

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run local``` use serverless offline to test locally. 

### Deploy on AWS, simply run:

```
$ npm run deploy

# or

$ serverless deploy
```