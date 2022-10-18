import Joi from "joi";
import { pipeline } from "ts-pipe-compose";

interface ExampleConfig {
  appName: string;
}

const loadEnvs = (env: NodeJS.ProcessEnv): ExampleConfig => ({
  appName: env.APP_NAME!,
});

const validateConfig = (config: ExampleConfig): ExampleConfig => {
  const schema = Joi.object<ExampleConfig>().keys({
    appName: Joi.string().required(),
  });

  const { error, value } = schema.validate(config);

  if (error) {
    throw error;
  }

  return <ExampleConfig>value;
};

const createConfig = pipeline(loadEnvs, validateConfig);

export const exampleConfig = createConfig(process.env);
