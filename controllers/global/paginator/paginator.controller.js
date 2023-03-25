require("dotenv").config()

exports.paginate = async ({
    Model,
    page,
    pageSize: size,
    include = [],
    where = {}
}) => {
    const pageSize = parseInt(size) ?? parseInt(process.env.PAGE_SIZE);

    let ofs = parseInt((page - 1) * pageSize)

    let lim = parseInt(pageSize)

    let totalUser = await Model.count(
        where
    )

    let data = await Model.findAll({
        include,
        where,
        offset: ofs,
        limit: lim,
    }).catch((e, r) => {
        let u = e
    });

    return {
        data: data,
        page,
        pages: Math.round(totalUser / pageSize),
        pageSize,
        total: totalUser
    }
}