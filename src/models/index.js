import { writeFileSync, mkdirSync } from 'fs';
import { Sequelize, Op } from "sequelize";
import sequelizeErd from "sequelize-erd";
import { SchemaToIndexes } from "./_helpers/SequelizeSchemaHelper.js";
import {
    EBLang,
    EBTemplate,
    EBUser,
    EBUserBilling,
    EBUserContact,
    EBUserCredential,
    EBUserPayment,
    EBUserPermission,
    EBUserRole,
    EBUserRolePermissionMapping,
    EBUserSession,
    EBUserShipping,
    EBUserStatus,
    EBTemplateUserMapping,
} from "./stores";

export const initializeModels = async () => 
{
    const sequelize = new Sequelize('mu-flexbox-layout-editor-db', 'root', 'password', {
        dialect: 'mysql',
        host: "160.191.154.162",
        port: 33104,
        dialectOptions: {
          // Your mysql2 options here
        //   socketPath: '/tmp/mysql.sock',
        },
    });
    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const Lang = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('Lang', EBLang.makeSchema());

        const UserPermission = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserPermission', EBUserPermission.makeSchema());
        const UserRole = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserRole', EBUserRole.makeSchema());
        const UserRolePermissionMapping = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserRolePermissionMapping', EBUserRolePermissionMapping.makeSchema());
    
        const User = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('User', EBUser.makeSchema());
        const UserCredential = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserCredential', EBUserCredential.makeSchema());
        const UserSession = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserSession', EBUserSession.makeSchema());
        const UserContact = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserContact', EBUserContact.makeSchema());
        const UserShipping = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserShipping', EBUserShipping.makeSchema());
        const UserBilling = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserBilling', EBUserBilling.makeSchema());
        const UserPayment = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserPayment', EBUserPayment.makeSchema());
        const UserStatus = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserStatus', EBUserStatus.makeSchema());

        const Template = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('Template', EBTemplate.makeSchema());
        const UserTemplateMapping = ((tableName, schema) => { return sequelize.define(tableName, schema, { indexes: SchemaToIndexes(schema), }); })('UserTemplateMapping', EBTemplateUserMapping.makeSchema());
    
        EBLang.makeAssociations({Me: Lang, });
    
        EBUserPermission.makeAssociations({Me: UserPermission, });
        EBUserRole.makeAssociations({Me: UserRole, });
        EBUserRolePermissionMapping.makeAssociations({Me: UserRolePermissionMapping, UserPermission, UserRole, });
    
        EBUser.makeAssociations({Me: User, UserRole, });
        EBUserCredential.makeAssociations({Me: UserCredential, User, });
        EBUserSession.makeAssociations({Me: UserSession, User, UserCredential, });
        EBUserContact.makeAssociations({Me: UserContact, User, });
        EBUserShipping.makeAssociations({Me: UserShipping, User, });
        EBUserBilling.makeAssociations({Me: UserBilling, User, });
        EBUserPayment.makeAssociations({Me: UserPayment, User, });
        EBUserStatus.makeAssociations({Me: UserStatus, User, });

        EBTemplate.makeAssociations({Me: Template, Lang, });
        EBTemplateUserMapping.makeAssociations({Me: UserTemplateMapping, Template, User, });

        await sequelize.sync({
            force: false,
            alter: false,
        });


        (async function(){
            mkdirSync('./doc', { recursive: true });
            let output = await sequelizeErd({ source: sequelize, format: 'dot', }); // sequelizeErd() returns a Promise
            output = output
            .replace(/rankdir=LR,/, "rankdir=TB,")
            .replace(/ranksep=2/, "ranksep=1")
            writeFileSync('./doc/erd.dot', output);
          
            // Writes erd.svg to local path with SVG file from your Sequelize models
        })();


        return {
            Lang,
            UserPermission,
            UserRole,
            UserRolePermissionMapping,
            User,
            UserCredential,
            UserSession,
            UserContact,
            UserShipping,
            UserBilling,
            UserPayment,
            Template,
            UserTemplateMapping,
        }
        
    
    } catch (error) {
        console.error('Unable to connect to the database:', error);

        return null;
    }
}

