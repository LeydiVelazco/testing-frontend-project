// modelo segun la respuesta que envia el backend por GET
export class EmpresaGetResponse {
    status: boolean ;
    statusCode: number ;
    message: string ;
    empresa: any ;
}