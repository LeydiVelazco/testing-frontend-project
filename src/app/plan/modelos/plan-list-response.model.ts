// modelo de listado de planes segun la respuesta que envia el backend por GET
import { PlanModel } from './plan-info.model';

export class PlanListResponse {
    status: boolean ;
    message: string ;
    cronogramas: any ;
}
