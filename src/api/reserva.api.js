import { Router } from "express";
import Reserva from "../models/Reserva";

const reservaApi = Router();

reservaApi.get('/', async (req, res) => {
  const {id_user} = req.query;
  try {
    let reservas = [];
    if (id_user) {
      reservas = await Reserva.find({id_user}).populate(["id_user", "id_service", "id_barbero"]);
    } else {
      reservas = await Reserva.find().populate(["id_user","id_service", "id_barbero"]);
    }
    return res.json({ success: true, reservas });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  };
});

reservaApi.post('/create', async (req, res) => {
  try {
    const {id_user, id_service, id_barbero, date } = req.body;
    let reserva = await Reserva.findOne({date, id_barbero});
    if (reserva) {
      return res.json({success: false, message: 'Fecha no disponible'});
    }
    reserva = new Reserva({id_user, id_service, id_barbero, date, estado: 'Programado'});
    await reserva.save();
    return res.json({success: true, reserva});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  };
});

export default reservaApi;