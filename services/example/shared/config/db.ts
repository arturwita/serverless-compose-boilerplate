import Joi from "joi";
import { ConnectionOptions } from "typeorm";
import { pipeline } from "ts-pipe-compose";
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
  url: env.POSTGRES_URL,
});

const validateDbConfig = (config: ConnectionOptions) => {
  const schema = Joi.object<ConnectionOptions>().keys({
    type: Joi.string().required(),
    synchronize: Joi.any().allow(false).required(),
    logging: Joi.boolean().required(),
    entities: Joi.array().items(Joi.any().required()).required(),
    url: Joi.string().required(),
  });

  Joi.assert(config, schema);

  return config;
};

const createDbConfigFromEnvs = pipeline(loadDbConfigFromEnvs, validateDbConfig);

const dbConfig = createDbConfigFromEnvs(process.env);

export = dbConfig;
