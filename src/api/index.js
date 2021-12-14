import { Router } from "express";
import servicesApi from "./service.api";
import userApi from "./user.api";
import authApi from "./auth.api";

const api = Router();

api.use('/users', userApi);
api.use('/services', servicesApi);
api.use('/auth', authApi);
export default api;
