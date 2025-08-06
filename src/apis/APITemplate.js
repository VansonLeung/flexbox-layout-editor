import { _APIGenericCRUD } from "./_incl"

export const APITemplate = {
    initialize: ({ appWithMeta, models }) => {
        _APIGenericCRUD.initialize({ 
            appWithMeta,
            collectionName: `Template`,
            collectionModel: models.Template,
        })
    }
}

