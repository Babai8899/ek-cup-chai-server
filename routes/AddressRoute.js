import { Router } from "express";

import { addAddress,getAddressById, deleteAddress,updateAddress, updateAddressLocation } from "../controllers/AddressController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addAddress);
router.get("/:addressId", getAddressById);
router.delete("/:addressId", deleteAddress);
router.put("/:addressId", updateAddress);
router.patch("/:addressId/location", updateAddressLocation);


export default router;