var start = require('./server');

start();

var model = require('./users/user.model');
async function main() {
    try {
        let result = await model.findeOne("e1e425e2-cde9-462e-a3f5-680f8caefd13");
        console.log(result);
    } catch (err) {
        console.log(err, "err");
    }
}

main();