import { environment } from '../../environments/environment';
export class User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    image: string;
    token: string;
    birth_date: any;

    constructor(input: any) {
        Object.assign(this, input);

        return this;
    }
    
    fullName() {
        return this.name + ' ' + this.last_name;
    }
    imageUrl() {
        return environment.filesUrl + '/profiles/' + this.image;
    }
}
