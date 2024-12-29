const Joi = require('joi');

function createJoiSchema(attributes) {
    const joiSchema = {};

    attributes.forEach(attr => {
        let joiType;
        switch(attr.type) {
            case 'string':
                joiType = Joi.string();
                break;
            
            case 'number':
                joiType = Joi.number();
                break;

            case 'boolean':
                joiType = Joi.boolean();
                break;
            
            default:
                throw new Error(`Unsupported type: ${attr.type}`);
        }

        if(attr.required) joiType = joiType.required();
        if(attr.min !== undefined) joiType = joiType.min(attr.min);
        if(attr.max !== undefined) joiType = joiType.max(attr.max);

        joiSchema[attr.name] = joiType;
    })

    return Joi.object(joiSchema);
}

module.exports = { createJoiSchema };