
export interface AppConfigType {
    port: number,
    host: string,
    production: boolean,
    privateKey: string,
};

const config: AppConfigType = {
    port: process.env.PORT === undefined ? 3000 : new Number(process.env.PORT).valueOf(),
    host: process.env.HOST === undefined ? 'localhost' : process.env.HOST,
    production: process.env.PROD === undefined ? false : true,
    privateKey: 'secret!',
}


export default config;
