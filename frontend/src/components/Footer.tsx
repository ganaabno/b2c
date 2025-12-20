// src/components/Footer.tsx
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOn from "@mui/icons-material/LocationOnOutlined";
import Email from "@mui/icons-material/EmailOutlined";
import LocalPhone from "@mui/icons-material/LocalPhoneRounded";
import { FaTiktok } from "react-icons/fa";
export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 transition-colors duration-300 font-sans">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          
          {/* Column 1 */}
          <div className="pt-8 pl-12 pr-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">GTC Mongolia</h1>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Дэлхийгээр аялж , Дэлхийн дайтай сэтгэе! Мөрөөдлийн аяллаа
              бидэнтэй эхлүүл!
            </p>
            <div className="flex gap-4 mb-4 items-center">
              <div className="font-medium text-gray-900 dark:text-gray-200">Сошиал хаягууд:</div>
              <a
                href="https://www.facebook.com/global.travel.corporation.mongolia"
                target="blank"
                className="text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                <FacebookIcon fontSize="large" />{" "}
              </a>
              <a 
                href="https://www.instagram.com/gtc_mongolia/" 
                target="blank"
                className="text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                {" "}
                <InstagramIcon fontSize="large" />
              </a>
              <a 
                href="https://www.youtube.com/@GLOBAL_TRAVEL_CORPORATION" 
                target="blank"
                className="text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                {" "}
                <YouTubeIcon fontSize="large" />
              </a>
               <a 
                href="https://www.tiktok.com/@gtc.mongolia" 
                target="blank"
                className="text-gray-700 dark:text-white hover:text-green-600 dark:hover:text-green-500 transition-colors"
              >
                {" "}
                <FaTiktok fontSize="large" />
              </a>
              
            </div>
          </div>

          {/* Column 2 */}
          <div >
            <div className="pt-8 px-4 flex flex-col gap-4 text-sm">
              <div className="flex gap-2 items-start text-gray-600 dark:text-gray-400">
                <LocationOn className="text-green-600 dark:text-green-500 shrink-0" />
                Хаяг: Улаанбаатар хот, СБД, Сүхбаатарын талбай, CITY TOWER
                business center, 7 давхар, 701 тоот
              </div>
              <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                <Email className="text-green-600 dark:text-green-500 shrink-0" />
                Майл : info@global-travel.mn
              </div>
              <div className="flex gap-2 mb-4 items-center text-gray-600 dark:text-gray-400">
                <LocalPhone className="text-green-600 dark:text-green-500 shrink-0" /> <div>Утас: </div>
                <div className="text-gray-900 dark:text-white font-bold">76060606</div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div >
            <div className="pt-8 px-4 flex flex-col gap-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center">Ажлын цаг</h3>
              <div className="grid grid-cols-2 mb-4 text-sm">
                <div className="flex flex-col gap-4 items-end text-gray-500 dark:text-gray-500">
                  <div>Даваа-Баасан:</div>
                  <div>Бямба:</div>
                  <div>Ням:</div>
                </div>
                <div className="flex flex-col gap-4 text-gray-800 dark:text-gray-200 font-medium">
                  <div className="ml-4">09:00-19:00</div>
                  <div className="ml-4">10:00-18:00</div>
                  <div className="ml-4">13:00-18:00</div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-200 dark:border-gray-800"></hr>
        
        <div className="text-center pt-4 pb-6 text-gray-500 dark:text-gray-600 text-xs">
          @2025 All rights reserved
        </div>
      </footer>
    </>
  );
}