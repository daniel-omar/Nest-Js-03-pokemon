export const envConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    defaultLimit: +(process.env.DEFAULT_LIMIT || '6'),
    mongodb: process.env.MONGODB || 'mongodb://localhost:27017/pokedex',
    port: process.env.PORT || '3105',
});