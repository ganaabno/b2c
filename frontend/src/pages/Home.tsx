import Comments from "@/components/ui/comments";
import TourGrid from "../components/TourGrid";
import TourTable from "../components/TourTable";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  return (
    <>
      <div className="w-screen h-[70vh] relative -mt-20 md:-mt-32">
        {" "}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="video.mp4" type="video/mp4" />
        </video>
        <div className="absolute bottom-50 left-60 flex flex-col gap-8 -mb-20">
          <h1
            className="font-bold text-5xl
              bg-linear-to-b from-white to-white/60
              bg-clip-text text-transparent
              [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            "
          >
            GTC MONGOLIA
          </h1>
          <p
            className="
              font-bold text-2xl
              bg-linear-to-b from-white to-white/70
              bg-clip-text text-transparent
              [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            "
          >
            Дэлхийгээр Аялж. <br />
            Дэлхийн Дайтай Сэтгэе!
          </p>
          <p
            className="
              font-bold text-md
              bg-linear-to-b from-white to-white/70
              bg-clip-text text-transparent
              [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]
            "
          >
            GTC MONGOLIA: Мөрөөдлийн аяллаа <br /> бидэнтэй эхлүүл Тансаг
            аялалыг <br />
            хамгийн хямдаар санал болгож байна
          </p>
        </div>
        <div>
          <SearchBox />
        </div>
      </div>

      {/* Margin top 10 aar zai avch bgaa */}
      <div className="w-full mt-30"></div>
      <TourTable />
      <div>
        <TourGrid />
      </div>
      <div>
        <Comments />
      </div>
    </>
  );
}
