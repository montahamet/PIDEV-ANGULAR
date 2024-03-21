import { StatusCandidacy } from "./status-candidacy";

export class Candidacy {
    candidacy_id!: number;
    candidateName!: string;
    link!: string;
    cv!:string;
    coverLetter!:string;
    submissionDate!:Date;
    candidacystatus!:StatusCandidacy;

}
