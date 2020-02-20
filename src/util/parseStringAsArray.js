export default function parseStringAsArray( arrayAsString ) {

    //O split quebra a string em varias strings pegando pela virgula
    //O trim retira todo espaço antes ou depois de cada string
    return arrayAsString.split(',').map( tech => tech.trim() );
}