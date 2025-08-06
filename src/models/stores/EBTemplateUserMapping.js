
import Sequelize, { DataTypes } from "sequelize"
import { Settings } from "../_settings";
import { BasicAttributes, DatedSoftDeleteStatusAttributes, DatedStatusAttributes } from "../_incl";

export const EBTemplateUserMapping = {
    makeAssociations: ({Me, Template, User}) => {
        Template.belongsToMany(User, { 
            through: Me,
            as: 'users',
            foreignKey: 'templateId',
            constraints: Settings.constraints,
        });
        User.belongsToMany(Template, { 
            through: Me,
            as: 'templates',
            foreignKey: 'userId',
            constraints: Settings.constraints,
        });
    },

    makeSchema: () => {
        return {
            ...BasicAttributes(),
            ...DatedStatusAttributes(),
            ...DatedSoftDeleteStatusAttributes(),
            templateId: DataTypes.UUID,
            userId: DataTypes.UUID,
        }
    },
};

