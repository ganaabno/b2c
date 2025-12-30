import express from "express";
import { protect, restrictTo, AuthRequest } from "../middleware/auth";
import { createTable } from "../resolvers/price_tables/createTable";

import { getHainan } from "../resolvers/price_tables/getHainan";
import { createHainan } from "../resolvers/price_tables/createHainan";
import { updateHainan } from "../resolvers/price_tables/updateHainan";
import { deleteHainan } from "../resolvers/price_tables/deleteHainan";

// Additional price table resolvers
import { getSingapore } from "../resolvers/price_tables/getSingapore";
import { createSingapore } from "../resolvers/price_tables/createSingapore";
import { updateSingapore } from "../resolvers/price_tables/updateSingapore";
import { deleteSingapore } from "../resolvers/price_tables/deleteSingapore";

import { getHoChiMinhPhuQuoc } from "../resolvers/price_tables/getHoChiMinhPhuQuoc";
import { createHoChiMinhPhuQuoc } from "../resolvers/price_tables/createHoChiMinhPhuQuoc";
import { updateHoChiMinhPhuQuoc } from "../resolvers/price_tables/updateHoChiMinhPhuQuoc";
import { deleteHoChiMinhPhuQuoc } from "../resolvers/price_tables/deleteHoChiMinhPhuQuoc";

import { getThailandBanggok } from "../resolvers/price_tables/getThailandBanggok";
import { createThailandBanggok } from "../resolvers/price_tables/createThailandBanggok";
import { updateThailandBanggok } from "../resolvers/price_tables/updateThailandBanggok";
import { deleteThailandBanggok } from "../resolvers/price_tables/deleteThailandBanggok";

import { getPhuket } from "../resolvers/price_tables/getPhuket";
import { createPhuket } from "../resolvers/price_tables/createPhuket";
import { updatePhuket } from "../resolvers/price_tables/updatePhuket";
import { deletePhuket } from "../resolvers/price_tables/deletePhuket";

import { getJapan } from "../resolvers/price_tables/getJapan";
import { createJapan } from "../resolvers/price_tables/createJapan";
import { updateJapan } from "../resolvers/price_tables/updateJapan";
import { deleteJapan } from "../resolvers/price_tables/deleteJapan";

import { getPhuQuoc } from "../resolvers/price_tables/getPhuQuoc";
import { createPhuQuoc } from "../resolvers/price_tables/createPhuQuoc";
import { updatePhuQuoc } from "../resolvers/price_tables/updatePhuQuoc";
import { deletePhuQuoc } from "../resolvers/price_tables/deletePhuQuoc";

import { getNhaTrang } from "../resolvers/price_tables/getNhaTrang";
import { createNhaTrang } from "../resolvers/price_tables/createNhaTrang";
import { updateNhaTrang } from "../resolvers/price_tables/updateNhaTrang";
import { deleteNhaTrang } from "../resolvers/price_tables/deleteNhaTrang";

import { getBali } from "../resolvers/price_tables/getBali";
import { createBali } from "../resolvers/price_tables/createBali";
import { updateBali } from "../resolvers/price_tables/updateBali";
import { deleteBali } from "../resolvers/price_tables/deleteBali";

import { getTurkey } from "../resolvers/price_tables/getTurkey";
import { createTurkey } from "../resolvers/price_tables/createTurkey";
import { updateTurkey } from "../resolvers/price_tables/updateTurkey";
import { deleteTurkey } from "../resolvers/price_tables/deleteTurkey";

import { getDalyan } from "../resolvers/price_tables/getDalyan";
import { createDalyan } from "../resolvers/price_tables/createDalyan";
import { updateDalyan } from "../resolvers/price_tables/updateDalyan";
import { deleteDalyan } from "../resolvers/price_tables/deleteDalyan";

import { getHalongBay } from "../resolvers/price_tables/getHalongBay";
import { createHalongBay } from "../resolvers/price_tables/createHalongBay";
import { updateHalongBay } from "../resolvers/price_tables/updateHalongBay";
import { deleteHalongBay } from "../resolvers/price_tables/deleteHalongBay";

export const priceTableRouter = express.Router();

priceTableRouter.get(
  "/hainan",

  getHainan
);

priceTableRouter.post(
  "/hainan",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createHainan
);

priceTableRouter.put(
  "/hainan/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateHainan
);

priceTableRouter.delete(
  "/hainan/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteHainan
);

// Singapore
priceTableRouter.get(
  "/singapore",

  getSingapore
);
priceTableRouter.post(
  "/singapore",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createSingapore
);
priceTableRouter.put(
  "/singapore/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateSingapore
);
priceTableRouter.delete(
  "/singapore/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteSingapore
);

// Ho Chi Minh / Phu Quoc
priceTableRouter.get(
  "/ho_chi_minh_phu_quoc",

  getHoChiMinhPhuQuoc
);
priceTableRouter.post(
  "/ho_chi_minh_phu_quoc",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createHoChiMinhPhuQuoc
);
priceTableRouter.put(
  "/ho_chi_minh_phu_quoc/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateHoChiMinhPhuQuoc
);
priceTableRouter.delete(
  "/ho_chi_minh_phu_quoc/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteHoChiMinhPhuQuoc
);

// Thailand Banggok
priceTableRouter.get(
  "/thailand_banggok",

  getThailandBanggok
);
priceTableRouter.post(
  "/thailand_banggok",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createThailandBanggok
);
priceTableRouter.put(
  "/thailand_banggok/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateThailandBanggok
);
priceTableRouter.delete(
  "/thailand_banggok/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteThailandBanggok
);

// Phuket
priceTableRouter.get(
  "/phuket",

  getPhuket
);
priceTableRouter.post(
  "/phuket",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createPhuket
);
priceTableRouter.put(
  "/phuket/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updatePhuket
);
priceTableRouter.delete(
  "/phuket/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deletePhuket
);

// Japan
priceTableRouter.get(
  "/japan",

  getJapan
);
priceTableRouter.post(
  "/japan",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createJapan
);
priceTableRouter.put(
  "/japan/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateJapan
);
priceTableRouter.delete(
  "/japan/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteJapan
);

// Phu Quoc
priceTableRouter.get(
  "/phu_quoc",

  getPhuQuoc
);
priceTableRouter.post(
  "/phu_quoc",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createPhuQuoc
);
priceTableRouter.put(
  "/phu_quoc/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updatePhuQuoc
);
priceTableRouter.delete(
  "/phu_quoc/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deletePhuQuoc
);

// Nha Trang
priceTableRouter.get(
  "/nha_trang",

  getNhaTrang
);
priceTableRouter.post(
  "/nha_trang",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createNhaTrang
);
priceTableRouter.put(
  "/nha_trang/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateNhaTrang
);
priceTableRouter.delete(
  "/nha_trang/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteNhaTrang
);

// Bali
priceTableRouter.get("/bali", getBali);
priceTableRouter.post(
  "/bali",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createBali
);
priceTableRouter.put(
  "/bali/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateBali
);
priceTableRouter.delete(
  "/bali/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteBali
);

// Turkey
priceTableRouter.get(
  "/turkey",

  getTurkey
);
priceTableRouter.post(
  "/turkey",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createTurkey
);
priceTableRouter.put(
  "/turkey/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateTurkey
);
priceTableRouter.delete(
  "/turkey/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteTurkey
);

// Dalyan
priceTableRouter.get(
  "/dalyan",

  getDalyan
);
priceTableRouter.post(
  "/dalyan",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createDalyan
);
priceTableRouter.put(
  "/dalyan/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateDalyan
);
priceTableRouter.delete(
  "/dalyan/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteDalyan
);

// Halong Bay
priceTableRouter.get(
  "/halong_bay",

  getHalongBay
);
priceTableRouter.post(
  "/halong_bay",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createHalongBay
);
priceTableRouter.put(
  "/halong_bay/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  updateHalongBay
);
priceTableRouter.delete(
  "/halong_bay/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  deleteHalongBay
);

priceTableRouter.post(
  "/",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createTable
);

priceTableRouter.put(
  "/:id",
  protect,
  restrictTo("MANAGER", "ADMIN"),
  createTable
);
