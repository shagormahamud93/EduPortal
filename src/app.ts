// import type { Application, Request, Response } from "express";
// import router from "./app/routes";
// import express from "express";
// import cors from "cors";

// const app:Application = express();

// //persers
// app.use(express.json());
// app.use(cors());

// //application routes
// app.use("/api/v1", router);


// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
// });

// export default app

import { errorHandler } from "./app/middleware/error.middleware";
import router from "./app/routes";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);

export default app;
