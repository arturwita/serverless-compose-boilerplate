<p align="center">
 <img src="data/logo.svg" alt="" />
</p>

Boilerplate code for rapidly creating ready-to-deploy Serverless Framework services using Serverless Compose.

### Quick Start

1. **Install packages**

```
npm install --legacy-peer-deps
```

2. **Set environment variables**

Navigate to every service directory and create a `.env` file, for example by running these commands:

```
cd services/example && cp .env.dist .env
cd ../migration && cp .env.dist .env
```

3. **Run migrations**

```
npm run run-migrations
```

### Start application locally

1. **Make sure docker is up**

```
docker-compose-up -d
```

2. **Start a service**

```
npm run dev:<service_name>
```

### Run workflow locally

1. **Make sure docker is up**

```
docker-compose-up -d
```

2. **Start a service which contains this workflow (terminal 1)**

```
npm run dev:<service_name>
```

3. **Run the workflow (terminal 2)**

```
npm run start-workflow:<service_name> --workflow=<workflow_name>
```

### Follow workflow logs

To follow all the logs from the step function executions you can use the command:

```
npm run get-sf-logs:<service_name>
```

### Develop workflow

We support ASL for Step Functions. Make sure to install AWS Toolkit, so you can render graph for step functions and
validate its syntax easily.

### Deploy

The best choice for deployment is the bitbucket pipeline.

Deployment [pipeline](bitbucket-pipelines.yml) consist of two steps:

1. compile (automated start)
    - build
    - run lint
    - run test
2. deploy (user action required)

### Other good source of information

- Variables in YAML files - https://serverless.com/framework/docs/providers/aws/guide/variables/
- AWS configuration for serverless - https://serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/
- Serverless Compose - https://www.serverless.com/framework/docs/guides/compose

### What do we use for testing lambdas?

1. [supertest](https://github.com/visionmedia/supertest#readme)
1. [mocha](https://mochajs.org/)

Here you can check example tests: [handler.spec.ts](services/example/functions/example-lambda/tests/handler.spec.ts)

### What do we use for validating schemas?

We use [joi](https://joi.dev/) for schema validation.

### **Issues:**

If you notice any issues while using, let me know
on **[GitHub](https://github.com/arturwita/serverless-compose-boilerplate/issues)**.

### **About us:**

<p align="center">
  <a href="https://tsh.io"><b>The Software House</b></a>
  &emsp;
  <img src="data/tsh.png" alt="tsh.png" width="50" />
</p>

### License

[![license](https://img.shields.io/badge/license-MIT-4dc71f.svg)](https://raw.githubusercontent.com/TheSoftwareHouse/serverless-boilerplate/main/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).
