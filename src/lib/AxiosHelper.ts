import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class AxiosHelper {
    customAxios: AxiosInstance;
    static baseUrl = "https://onshape-corp-dev-test.cphostaccess.com";
    constructor() {
        this.customAxios = axios.create({
            baseURL: AxiosHelper.baseUrl,
            timeout: 5000,
            validateStatus: (validateStatus) => {
                return (validateStatus >= 200 && validateStatus < 350) || validateStatus == 404
            },
            maxRedirects: 0,
            // auth: {
            //   username: 'yourUsername',
            //   password: 'yourPassword',
            // },
            headers: { 
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
            },
        });
    }

    public async sendRequest(url: string): Promise<AxiosResponse> {
        const requestConfig = {
            method: 'GET',
            url: url,
          };
          
        return this.customAxios(requestConfig);
    }

}
