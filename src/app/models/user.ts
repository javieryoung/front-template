import { environment } from '../../environments/environment';
export class User {
    name: string;
    last_name: string;
    email: string;
    image: string;
    token: string;

    deserialize(input: any): this {
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
