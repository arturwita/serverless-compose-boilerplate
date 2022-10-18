import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import httpEventNormalizer from "@middy/http-event-normalizer";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import middy from "@middy/core";
import { awsLambdaResponse } from "../../../../shared/aws";
import { winstonLogger } from "../../../../shared/logger";
import { ConnectionManager } from "../../../../shared/utils/connection-manager";
import { ExampleModel } from "../../../../shared/models/example.model";
import { v4 } from "uuid";
import { exampleConfig } from "./config";
import { joiValidator } from "../../../../shared/middleware/joi-validator";
import { schema } from "./event.schema";
import { inputOutputLoggerConfigured } from "../../../../shared/middleware/input-output-logger-configured";
import { customHttpErrorHandler } from "../../../../shared/middleware/custom-http-error-handler";
import { queryParser } from "../../../../shared/middleware/query-parser";
import exampleServiceDbConfig from "../../shared/config/db";

export const handle = middy(async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  const queryParams = event.queryStringParameters;

  winstonLogger.info(`Hello from ${exampleConfig.appName}. Example param is: ${queryParams}`);

  const connectionManager = new ConnectionManager(exampleServiceDbConfig);
  const connection = await connectionManager.getConnection();

  await connection.getRepository(ExampleModel).save(
    ExampleModel.create({
      id: v4(),
      email: "some@tmp.pl",
      firstName: "Test",
      lastName: "User",
    }),
  );

  return awsLambdaResponse(200, {
    success: true,
    data: await connection.getRepository(ExampleModel).find({}),
  });
})
  .use(inputOutputLoggerConfigured())
  .use(httpEventNormalizer())
  .use(httpHeaderNormalizer())
  .use(queryParser())
  .use(joiValidator(schema))
  .use(customHttpErrorHandler());
