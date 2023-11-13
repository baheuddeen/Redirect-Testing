import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class AxiosHelper {
    customAxiosTest: AxiosInstance;
    customAxiosLive: AxiosInstance;

    static baseUrlTest = "https://onshape-corp-dev-test.cphostaccess.com";
    static baseUrlLive = "https://www.onshape.com";

    constructor() {
        const headers = { 
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
            'Accept-Language': 'en-US,en;q=0.5', 
            'Accept-Encoding': 'gzip, deflate, br', 
            'Connection': 'keep-alive', 
            'Upgrade-Insecure-Requests': '1', 
            'Sec-Fetch-Dest': 'document', 
            'Sec-Fetch-Mode': 'navigate', 
            'Sec-Fetch-Site': 'none', 
            'Sec-Fetch-User': '?1', 
            'Pragma': 'no-cache', 
            'Cache-Control': 'no-cache',
        };

        this.customAxiosTest = axios.create({
            baseURL: AxiosHelper.baseUrlTest,
            timeout: 5000,
            validateStatus: (validateStatus) => {
                return (validateStatus >= 200 && validateStatus < 350) || validateStatus == 404
            },
            // maxRedirects: 0,
            // auth: {
            //   username: 'yourUsername',
            //   password: 'yourPassword',
            // },
           
        });
        this.customAxiosLive = axios.create({
            baseURL: AxiosHelper.baseUrlLive,
            timeout: 5000,
            validateStatus: (validateStatus) => {
                return (validateStatus >= 200 && validateStatus < 350) || validateStatus == 404
            },
            // maxRedirects: 0,
            // auth: {
            //   username: 'yourUsername',
            //   password: 'yourPassword',
            // },
           
        });
    }

    public async sendRequestTest(url: string): Promise<AxiosResponse> {
        const requestConfig = {
            method: 'GET',
            url: url,
          };
          
        return this.customAxiosTest(requestConfig);
    }

    public async sendRequestLive(url: string): Promise<AxiosResponse> {
        const requestConfig = {
            method: 'GET',
            url: url,
          };
          
        return this.customAxiosLive(requestConfig);
    }
}
