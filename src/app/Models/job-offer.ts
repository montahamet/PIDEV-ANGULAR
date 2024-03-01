import { JobNature } from "./job-nature";

export class JobOffer {
    jobOffer_id!: number;
    titleJobOffer!: string;
    postedDate!: Date;
    Description!: string;
    requiredSkills!: string;
    Vacancy!: number;
    salary!: number;
    jobNature!:JobNature;

    
}
