import { Request, Response } from 'express';
import createUser from './services/createUser';

export function helloWorld(request : Request, response : Response) {
    const user = createUser({
        email : 'tiago@rocketseat.com',
        password : '123456',
        techs : [
            'Node', 
            'React',
            { title: 'Javascript', experience: 100 },
        ],
    });

    return response.json({message: 'Hello world!'});
}