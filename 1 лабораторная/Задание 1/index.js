express = require("express")
const app = express();

app.set("view engine", "pug")

app.get("/faq", (req, res) => {
    res.render("faq")
})

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});