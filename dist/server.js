import config from "./app/config/index.js";
import * as mongoose from "mongoose";
import app from "./app.js";
async function main() {
    try {
        await mongoose.connect(config.database_url);
        app.listen(config.port, () => {
            console.log(`Server is running port ${config.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
//# sourceMappingURL=server.js.map