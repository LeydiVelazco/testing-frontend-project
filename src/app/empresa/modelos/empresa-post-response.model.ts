// modelo segun la respuesta que envia el backend por POST
export class EmpresaPostResponse{
	status:boolean;
	statusCode:number;
	message: string;
	idEmpresa: number;
}