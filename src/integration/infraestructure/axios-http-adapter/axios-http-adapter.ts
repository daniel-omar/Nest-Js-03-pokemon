import axios, { AxiosRequestConfig } from 'axios';
import { HttpRequestI } from "src/common/interfaces/http-request.interface";
import { HttpAdapter } from "src/integration/domain/http-adapter";

export class AxiosHttpAdapter extends HttpAdapter {
    async send<T>(request: HttpRequestI): Promise<T> {
        const { url, method, data, params, headers } = request;

        const config: AxiosRequestConfig = {
            url: url,
            method: method,
            data: data,
            headers: headers,
        };

        try {
            const response = await axios(config);
            return response.data as T;
        } catch (error) {
            // Aquí puedes manejar errores específicos de Axios o relanzarlos
            throw new Error(`HTTP request failed: ${error.message}`);
        }
    }

}
