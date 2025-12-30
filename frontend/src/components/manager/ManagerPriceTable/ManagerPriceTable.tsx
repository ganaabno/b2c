//import { useState, useEffect, useReducer } from "react";
import HainanTable from "./HainanTable";
import SingaporeTable from "./SingaporeTable";
import HoChiMinhPhuQuocTable from "./HoChiMinhPhuQuocTable";
import ThailandBanggokTable from "./ThailandBanggokTable";
import PhuketTable from "./PhuketTable";
import JapanTable from "./JapanTable";
import PhuQuocTable from "./PhuQuocTable";
import NhaTrangTable from "./NhaTrangTable";
import BaliTable from "./BaliTable";
import TurkeyTable from "./TurkeyTable";
import DalyanTable from "./DalyanTable";
import HalongBayTable from "./HalongBayTable";
import ShanghaiTable from "./ShanghaiTable";
import JanjiejeTable from "./JanjiejeTable";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ManagerPriceTable = () => {
  return (
    <>
      <div className="w-full h-full overflow-auto">
        <div className=" w-full  flex px-10 dark:text-gray-200 text-gray-800">
          <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-amber-600 dark:bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-700 dark:hover:bg-amber-600 transition shadow-lg">
            <ArrowLeft  />
            <Link className="" to="/manager">
              Буцах
            </Link>
          </div>
        </div>
        <div className="m-10 flex flex-wrap gap-8 ">
          <HainanTable />
          <SingaporeTable />
          <HoChiMinhPhuQuocTable />
          <ThailandBanggokTable />
          <PhuketTable />
          <JapanTable />
          <PhuQuocTable />
          <NhaTrangTable />
          <BaliTable />
          <TurkeyTable />
          <DalyanTable />
          <HalongBayTable />
          <ShanghaiTable />
          <JanjiejeTable />
        </div>
      </div>
    </>
  );
};

export default ManagerPriceTable;
