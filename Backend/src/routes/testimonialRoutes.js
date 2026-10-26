import { Router } from "express";
import {
  createTestimonial,
  getTestimonials,
} from "../controllers/testimonialController.js";

const router = Router();

router.route("/").get(getTestimonials).post(createTestimonial);

export default router;
