import Joi from "joi";
import { pipeline } from "ts-pipe-compose";

export interface LambdaConfig {
  isOffline: boolean;
}

const loadConfigFromEnvs = (env: any): LambdaConfig => ({
  isOffline: Boolean(env.IS_OFFLINE),
});

const schema = Joi.object().keys({
  isOffline: Joi.boolean().required(),
});

const validateConfig = (config: LambdaConfig) => {
  Joi.assert(config, schema);
  return config;
};

const createConfigFromEnvs = pipeline(loadConfigFromEnvs, validateConfig);

export const lambdaConfig = createConfigFromEnvs(process.env);
