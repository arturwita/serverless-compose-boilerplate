import { Context } from "aws-lambda";
import middy from "@middy/core";

import { winstonLogger } from "../../../../shared/logger";
import { ConnectionManager } from "../../../../shared/utils/connection-manager";
import migrationServiceDbConfig from "../../shared/config/db";

export const handle = middy(async function handle(__: any, _: Context): Promise<any> {
  winstonLogger.info("Pre connection");

  const connectionManager = new ConnectionManager(migrationServiceDbConfig);
  const connection = await connectionManager.getConnection();

  await connection.runMigrations();

  winstonLogger.info("Post connection");

  return;
});
