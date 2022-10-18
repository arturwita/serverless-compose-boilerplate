import { ConnectionOptions, createConnection } from "typeorm";

export default async (config: ConnectionOptions) => createConnection(config);
