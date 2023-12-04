export default () => ({
	app: {
		port: +process.env.APP_PORT!,
		baseImageUrl: process.env.APP_BASE_IMAGE_URL
	},

	database: {
		type: 'mysql',
		host: process.env.DATABASE_HOST,
		port: +process.env.DATABASE_PORT!,
		username: process.env.DATABASE_USERNAME,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE_NAME,
		entities: ['src/entity/*.ts'],
		migrations: ['src/migrations/*.ts'],
		migrationsTableName: 'Migration',
		migrationsRun: true,
		synchronize: false,
		charset: 'utf8mb4'
	},

	aws: {
		region: process.env.AWS_REGION,
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		cognitoClientId: process.env.AWS_COGNITO_CLIENT_ID,
		cognitoPoolId: process.env.AWS_COGNITO_POOL_ID
	}
});
