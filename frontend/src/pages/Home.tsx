import Comments from "@/components/ui/comments";
import TourGrid from "../components/TourGrid";
import TourTable from "../components/TourTable";

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
        <div className="absolute bottom-40 left-140 flex flex-col gap-8 -mb-20">
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
        {/* <div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2  rounded-[980px] shadow-lg flex justify-center items-center
        py-12 px-36 bg-white"
        >
          <div className="flex gap-16">
            <div className="flex flex-col">
              <label htmlFor="from">From:</label>
              <select
                id="from"
                name="from"
                className="py-2 px-12 border rounded-4xl"
              >
                <option value="mongolia">Mongolia</option>
                <option value="china">China</option>
                <option value="us">US</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="to">To:</label>
              <select
                id="to"
                name="to"
                className="py-2 px-12 border rounded-4xl"
              >
                <option value="mongolia">Mongolia</option>
                <option value="china">China</option>
                <option value="us">US</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="departure">Departure Date:</label>
              <input
                type="date"
                id="departure"
                name="departure"
                className="py-2 px-12 border rounded-4xl"
              />
            </div> 
          </div>
        </div>*/}
      </div>

      {/* Margin top 10 aar zai avch bgaa */}
      <div className="w-full mt-10"></div>
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
