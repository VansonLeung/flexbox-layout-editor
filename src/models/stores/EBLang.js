import Sequelize, { DataTypes } from "sequelize"
import { BasicAttributes, CodeAttributes, DatedSoftDeleteStatusAttributes, DatedStatusAttributes } from "../_incl";

export const EBLang = {
    makeAssociations: ({Me}) => {

    },

    makeSchema: () => {
        return {
            ...BasicAttributes(),
            ...CodeAttributes(),
            ...DatedStatusAttributes(),
            ...DatedSoftDeleteStatusAttributes(),
        }
    },
};

