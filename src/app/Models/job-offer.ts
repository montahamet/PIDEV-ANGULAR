import { JobNature } from "./job-nature";

export class JobOffer {
    jobOffer_id!: number;
    titleJobOffer!: string;
    postedDate!: Date;
    description!: string;
    requiredSkills!: string;
    vacancy!: number;
    salary!: number;
    jobNature!:JobNature;

    
}
