import { Router } from "express";
import Service from "../models/Service";


const servicesApi = Router();

servicesApi.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    return res.json({success: true, services})
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

servicesApi.post('/create', async (req, res) => {
  try {
    const {name, price} = req.body;
    let service = await Service.findOne({name});
    if (service) {
      return res.json({success: false, message: 'Nombre no disponible'});
    }
    service = new Service({name, price, status: 'ACTIVE'});
    await service.save();
    return res.json({success: true, service});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

export default servicesApi;