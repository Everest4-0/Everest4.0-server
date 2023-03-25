require("dotenv").config()

exports.paginate = async ({
    Model,
    page,
    pageSize: size,
    include = [],
    where = {},
    order = []
}) => {

    const pageSize = parseInt(size) || parseInt(process.env.PAGE_SIZE);

    let ofs = Math.abs((parseInt(page || 1) - 1)) * pageSize

    let lim = parseInt(pageSize)

    let totalUser = await Model.count(
        where
    )

    let data = await Model.findAll({
        include,
        where,
        order,
        offset: ofs,
        limit: lim,
    }).catch((e, r) => {
        let u = e
    });

    return {
        data: data,
        page: page || 1,
        pages: Math.round(totalUser / pageSize),
        pageSize,
        total: totalUser
    }
}