
export class ContenidoModel {
    [x: string]: any;
    id?:string;
    name:string;
    title:string;
    category:string;
    link:string;
    image:string;
    description:string;
    email: string | null | undefined;
    creationDate:Date;

    constructor(name:string, title:string, category:string, link:string, image:string, description:string, email: string | null | undefined) {
        this.name = name;
        this.title = title;
        this.category = category;
        this.link= link;
        this.image = image; 
        this.description = description;
        this.email = email;
        this.creationDate = new Date();
    }
}