import { User } from './user';

export class Permission {
    user: User;
    role: string;
    over: string;
    over_id: number;

    constructor(input: any) {
        Object.assign(this, input);
        this.user = new User(this.user);
        return this;
    }

    translateRole() {
        if (this.role == 'student')
            return 'estudiante';
        else if  (this.role == 'admin')
            return 'administrador';
        else if (this.role == 'instructor')
            return 'profesor';
    }
}
