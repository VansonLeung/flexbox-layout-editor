import { _APIGenericCRUD } from "./_incl"

export const APIUser = {
    initialize: ({ appWithMeta, models }) => {
        _APIGenericCRUD.initialize({ 
            appWithMeta,
            collectionName: `User`,
            collectionModel: models.User,
        })
    }
}

