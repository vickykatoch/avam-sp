import { Router } from "express";

export class UserController {

    constructor(private router: Router) {

    }
    getRoutes() : Router {
        this.router.get('/info', (req,res)=> {
            res.json(this.getUserInfo());
        });
        return this.router;
    }
    private getUserInfo() {
        return {
            id : 'abcdef',
            name : 'Simple Simple'
        };
    }
}
