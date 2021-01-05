// modelo segun la respuesta que envia el backend por POST
import { AdminModel } from 'src/app/empresa/modelos/modelo admin/admin-info.model';

export class LoginPostResponse{
	status:boolean;
	statusCode:number;
	message: string;
	usuario: any;
}
