
import Sequelize, { DataTypes } from "sequelize"
import { BasicAttributes, CodeAttributes, ContentAssociations, ContentAttributes, DatedSoftDeleteStatusAttributes, DatedStatusAttributes, ParentChildAssociations, ParentChildAttributes } from "../_incl";

export const EBTemplate = {
    makeAssociations: ({Me, Lang}) => {
        CodeAttributes();
        ContentAssociations({ Me, Lang });
        ParentChildAssociations({ Me });;
    },

    makeSchema: () => {
        return {
            ...BasicAttributes(),
            ...DatedStatusAttributes(),
            ...DatedSoftDeleteStatusAttributes(),
            ...ContentAttributes(),
            ...ParentChildAttributes(),
        }
    },
};

