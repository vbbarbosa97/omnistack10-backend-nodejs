import apiGitHub from '../services/apiGitHub';
import parseStringAsArray from '../util/parseStringAsArray';
import Dev from '../models/Dev';

class DevController {   
    
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    }

    async store(req, res) {
        
        const { github_username, techs, longitude, latitude  } =  req.body;

        let dev = await Dev.findOne({ github_username });

        if(dev){
            return res
                .status(400)
                .json({ error: 'Usuário já cadastrado!' });
        }

        const response = await apiGitHub.get(`/users/${github_username}`);

        const { name = login, bio, avatar_url, } = response.data;

        
        const techsArray = parseStringAsArray(techs);

        //a longitude deve ser passada primeiro
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        dev = await Dev.create({
            github_username,
            name,
            bio,
            avatar_url,
            techs: techsArray,
            location,
        });
        
        return res.json(dev);
    }

}

export default new DevController;