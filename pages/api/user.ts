import type {NextApiRequest, NextApiResponse} from 'next';
import RenderResult from 'next/dist/server/render-result';

import { UserModel } from '../../models/UserModel';
import { DefaultMsgResponse } from '../../types/DefaultMsgResponse';

import {connect} from '../../middlewares/connectToMongoDB';

const registerEndPoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try {
        const {name, email, password} = req.body;

        if(req.method === "POST"){
            
            if(!name || name.trim().length < 2) {
                return res.status(400).json({error: "Nome não é válido."});
            }
            if(!email || email.trim().length < 5) {
                return res.status(400).json({error: "Email não é válido."});
            }
            if(!password || password.trim().length < 6 ) {
                return res.status(400).json({error: "Senha deve ter pelo menos 6 caracteres."});
            }
            const user = {name, email, password};

            await UserModel.create(user);

        }
        return res.status(405).json({error: "Método informado não existe."});
    }catch (e) {
        console.log("Error on create user:", e);
        return res.status(500).json({error: 'Não foi possível cadastrar usuário.'});
    }
}

export default connect(registerEndPoint);