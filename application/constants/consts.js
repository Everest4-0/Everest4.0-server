module.exports = class Consts{

    static ActivitySectors=[{ id: 2, name: 'Público' }, { id: 1, name: 'Privado' }, { id: 3, name: 'Outro' }]

    static NewsCategories = ['Negócio',
    'Finança',
    'Economia',
    'Computadores',
    'Ciência',
    'Tecnologia',
    'Entretenimento',
    'Arte',
    'Cultura',
    'Noticias gerais',
    'Atualidades',
    'Saúde',
    'Remédio',
    'Estilo de vida',
    'Desporto',
    'Videogames',
    'Lazer',
    'Comércio',
    'Profissional'].sort((x, y) => x > y ? 1 : -1);
}