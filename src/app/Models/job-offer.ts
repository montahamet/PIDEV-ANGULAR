import { JobNature } from "./job-nature";

export class JobOffer {
    jobOffer_id!: number;
    titleJobOffer!: string;
    postedDate!: Date;
    description!: string;
    jobLocation!:string;
    applicationDeadLine!: Date;
    experience!: string;
    requiredSkills!: string;
    vacancy!: number;
    minsalary!: number;
    maxsalary!: number;
    jobNature!:JobNature;


}
