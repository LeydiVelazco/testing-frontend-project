// modelo segun la respuesta que envia el backend por GET
export class AdminGetResponse {
    status: boolean ;
    statusCode: number ;
    message: string ;
    admin: any ;
}