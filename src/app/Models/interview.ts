import { StatusInterview } from "./status-interview";
import { TypeInterview } from "./type-interview";

export class Interview {
    interview_id!: number ;
    dateInterview!:Date;
    type!:TypeInterview;
    statusInterview!:StatusInterview;
    passed!:boolean;
}
