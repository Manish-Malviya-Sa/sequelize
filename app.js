const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const empCtrl = require('./controllers/empController')

app.get("/",(req,res) => {
    res.send("Home page");
})

app.get("/add",empCtrl.addEmployee);

app.get("/crud",empCtrl.crudOperation);

app.get("/query",empCtrl.queryOperation);

app.get("/finder",empCtrl.finderData);

app.get("/setter_getter",empCtrl.setter_getter);

app.get("/validations",empCtrl.validations);

app.get("/rawQuery",empCtrl.rawQuery); 

app.get("/One-To-One",empCtrl.oneToOne);

app.get("/belongsTo",empCtrl.belongsTo);

app.get("/hasMany",empCtrl.hasMany);

app.get("/manyToMany",empCtrl.manyToMany);

app.get("/scopes",empCtrl.scopes);

app.get("/Polymorphic_Associations",empCtrl.Polymorphic_Associations);

app.get("/Polymorphic_m2m",empCtrl.Polymorphic_m2m);

app.get("/loading",empCtrl.loading);

app.get("/paranoid",empCtrl.paranoid);

app.get("/transactions",empCtrl.transactions);

app.get("/hooks",empCtrl.hooks);  

app.get("/queryInterfaceData",empCtrl.queryInterfaceData);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});