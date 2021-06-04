const databaseService = {
    getAllSapces(knex){
        'Returns all notes in the database'
        return knex 
            .from('spaces')
            .select('*');
    },
    insertSpace(knex, newSpace){
        return knex
            .insert(newSpace)
            .into('spaces')
    },
    updateSpace(knex, id, upCount, downCount){
        return knex('spaces')
            .where({id})
            .update({
                upcount: upCount,
                downcount: downCount
            })
    }
}

module.exports = databaseService