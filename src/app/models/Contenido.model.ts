
export class ContenidoModel {
    id?:string;
    name:string;
    title:string;
    category:string;
    link:string;
    image:string;
    description:string;

    constructor(name:string, title:string, category:string, link:string, image:string, description:string) {
        this.name = name;
        this.title = title;
        this.category = category;
        this.link= link;
        this.image = image; 
        this.description = description;
        
    }
}