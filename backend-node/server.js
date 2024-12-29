const express = require('express');
const Ajv = require('ajv');
const ajv = new Ajv();

const app = express();
app.use(express.json());

app.post('/validate', (req, res) => {
    const body = req.body;
    console.log(body);

    const valid = validateSchema(body.schema, body.data);
    if(!valid) {
        return res.status(500).json({ message: "Validation failed: " + ajv.errorsText(validateAdditionalItems.errors) });
    }
    else {
        return res.status(200).json({ message: "Validation successful" });
    }
});

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    return valid;
}