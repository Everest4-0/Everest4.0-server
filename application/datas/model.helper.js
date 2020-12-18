class ModelHelper {


    static nextCode = async (M, prefix = null) => {
        let last = await M.findAll({
            limit: 1,
            where: {},
            order: [['createdAt', 'DESC']]
        })
        let code = ((last[0] || { code: 0 }).code || '').split('.')

        prefix = prefix ? prefix + '.' : '';
        let sufix = code[code.length > 1 ? 1 : 0];

        code = prefix + (((parseInt(sufix) || 0) + 1) + '').padStart(3, '0')
        return code;
    }
}


module.exports = ModelHelper