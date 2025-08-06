import Sequelize, { DataTypes } from "sequelize"
import { Settings } from "../_settings";
import { 
    BasicAttributes,
    ContactAttributes,
    DatedSoftDeleteStatusAttributes,
    DatedStatusAttributes,
} from "../_incl";

export const EBUserContact = {
    makeAssociations: ({Me, User}) => {
        Me.belongsTo(User, {
            foreignKey: 'userId',
            as: 'user',
            constraints: Settings.constraints,
        });
        User.hasMany(Me, {
            foreignKey: 'userId',
            as: 'contacts',
            constraints: Settings.constraints,
        });
    },

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
