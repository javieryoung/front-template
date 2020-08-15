import { environment } from '../../environments/environment';

export class File {
    file_name: string;
    database_file_name: string;

    placeholder: string;
    constructor(d) {
        Object.assign(this, d);
    }
    
    getUrl() {
        if (!this.database_file_name && this.placeholder)
            return this.placeholder
        return environment.filesUrl + '/' + this.database_file_name;
    }

    date() {
        let d = (this.database_file_name.split('_')[0]);
        let splitted = d.split('-');
        return (new Date(parseInt(splitted[0]), parseInt(splitted[1]), parseInt(splitted[2])))
    }
}
