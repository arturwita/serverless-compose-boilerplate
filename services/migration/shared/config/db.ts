import Joi from "joi";
import { ConnectionOptions } from "typeorm";
import { pipeline } from "ts-pipe-compose";
import { exampleMigration1605111464989 } from "../../migrations/1605111464989-example-migration";
import { ExampleModel } from "../../../../shared/models/example.model";

// MODELS_IMPORT

const loadDbConfigFromEnvs = (env: NodeJS.ProcessEnv): ConnectionOptions => ({
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [
    ExampleModel,
    // MODELS_SETUP
  ],
  migrations: [
    exampleMigration1605111464989,
    // PUT MIGRATIONS HERE
  ],
  cli: {
    migrationsDir: "services/migration/migrations",
  },
  url: env.POSTGRES_URL,
});

const validateDbConfig = (config: ConnectionOptions) => {
  const schema = Joi.object<ConnectionOptions>().keys({
    type: Joi.string().required(),
    url: Joi.string().required(),
    synchronize: Joi.any().allow(false).required(),
    logging: Joi.boolean().required(),
    entities: Joi.array().items(Joi.any().required()).required(),
    migrations: Joi.array().items(Joi.any().required()).required(),
    cli: Joi.object()
      .keys({
        migrationsDir: Joi.string().required(),
      })
      .required(),
  });

  Joi.assert(config, schema);

  return config;
};

const createDbConfigFromEnvs = pipeline(loadDbConfigFromEnvs, validateDbConfig);

const dbConfig = createDbConfigFromEnvs(process.env);

export = dbConfig;
