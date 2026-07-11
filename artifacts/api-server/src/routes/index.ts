import { Router, type IRouter } from "express";
import healthRouter from "./health";
import callbackRouter from "./callback";

const router: IRouter = Router();

router.use(healthRouter);
router.use(callbackRouter);

export default router;
