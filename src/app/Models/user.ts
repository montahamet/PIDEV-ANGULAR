import { Gender } from "./gender";

export class User {
    userId!: number ;
    email!: string;
    firstname!: string;
    lastname!: string;
    password!: string;
    Adresse!: string;
    gender!:Gender;
}
