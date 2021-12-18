import { Router } from "express";
import servicesApi from "./service.api";
import userApi from "./user.api";
import authApi from "./auth.api";
import reservaApi from "./reserva.api";

const api = Router();

api.use('/users', userApi);
api.use('/services', servicesApi);
api.use('/auth', authApi);
api.use('/reserva', reservaApi);
export default api;
