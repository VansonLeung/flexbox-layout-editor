import Sequelize, { DataTypes } from "sequelize"
import { BasicAttributes, ContactAttributes, DatedSoftDeleteStatusAttributes, DatedStatusAttributes } from "../_incl";
import { Settings } from "../_settings";

export const ECUserRegisterRequest = {
    makeSchema: () => {
        return {
            ...BasicAttributes(),
            ...DatedStatusAttributes(),
            ...DatedSoftDeleteStatusAttributes(),
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            ...ContactAttributes(),
        }
    },
}
