import { Op } from 'sequelize';

export const recursiveMassageWhereClause = (whereClause) => {
    const keys = Object.keys(whereClause);
    for (var k in keys) {
        switch (keys[k]) {
            case "$like": whereClause[Op.like] = whereClause.$like; delete whereClause.$like;
            case "$gt": whereClause[Op.gt] = whereClause.$gt; delete whereClause.$gt;
            case "$lt": whereClause[Op.lt] = whereClause.$lt; delete whereClause.$lt;
            case "$gte": whereClause[Op.gte] = whereClause.$gte; delete whereClause.$gte;
            case "$lte": whereClause[Op.lte] = whereClause.$lte; delete whereClause.$lte;
            case "$in": whereClause[Op.in] = whereClause.$in; delete whereClause.$in;
            case "$not": whereClause[Op.not] = whereClause.$not; delete whereClause.$not;
            case "$ne": whereClause[Op.ne] = whereClause.$ne; delete whereClause.$ne;
            case "$notIn": whereClause[Op.notIn] = whereClause.$notIn; delete whereClause.$notIn;
            case "$notLike": whereClause[Op.notLike] = whereClause.$notLike; delete whereClause.$notLike;
            case "$iLike": whereClause[Op.iLike] = whereClause.$iLike; delete whereClause.$iLike;
            case "$notILike": whereClause[Op.notILike] = whereClause.$notILike; delete whereClause.$notILike;
            case "$eq": whereClause[Op.eq] = whereClause.$eq; delete whereClause.$eq;
            case "$contains": whereClause[Op.contains] = whereClause.$contains; delete whereClause.$contains;
            case "$all": whereClause[Op.all] = whereClause.$all; delete whereClause.$all;
            case "$and": whereClause[Op.and] = whereClause.$and; delete whereClause.$and;
            case "$or": whereClause[Op.or] = whereClause.$or; delete whereClause.$or;
            case "$regexp": whereClause[Op.regexp] = whereClause.$regexp; delete whereClause.$regexp;
            case "$notRegexp": whereClause[Op.notRegexp] = whereClause.$notRegexp; delete whereClause.$notRegexp;
            case "$iRegexp": whereClause[Op.iRegexp] = whereClause.$iRegexp; delete whereClause.$iRegexp;
            case "$notIRegexp": whereClause[Op.notIRegexp] = whereClause.$notIRegexp; delete whereClause.$notIRegexp;
        }
    }
    for (var k in whereClause) {
        const val = whereClause[k];
        if (val && typeof(val) === 'object') {
            recursiveMassageWhereClause(val);
        }
    }
}