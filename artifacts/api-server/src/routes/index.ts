import { Router, type IRouter } from "express";
import healthRouter from "./health";
import callbackRouter from "./callback";
import devisRouter from "./devis";

const router: IRouter = Router();

router.use(healthRouter);
router.use(callbackRouter);
router.use(devisRouter);

export default router;
