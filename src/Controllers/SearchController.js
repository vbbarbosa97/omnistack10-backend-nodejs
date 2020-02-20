import Dev from '../models/Dev';
import parseStringAsArray from '../util/parseStringAsArray';

class SearchController {

    async index(req, res) {
        const {latitude, longitude, techs} = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                //$in  filtra se está dentro do array, consulta mongo operations
                $in: techsArray, 
            },
            location: {
                //o $near filtra os resultados pertos da localização passada
                $near: {
                    //tem que passar um ponto
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    //distancia do raio de busca do ponto em metros
                    $maxDistance: 10000,
                }
            }
        })

        return res.json(devs);
    }
}

export default new SearchController;