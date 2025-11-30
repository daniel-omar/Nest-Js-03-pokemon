import { HttpRequestI } from "src/common/interfaces/http-request.interface";

export abstract class HttpAdapter {
    // El método send debe ser genérico y retornar una Promesa de datos.
    abstract send<T>(request: HttpRequestI): Promise<T>;
}