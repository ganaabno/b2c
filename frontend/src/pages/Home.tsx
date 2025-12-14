import Footer from "../components/Footer";
import TourGrid from "../components/TourGrid";

export default function Home() {
  return (
    <>
      <div className="w-screen h-[80vh] relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="bg-video.mp4" type="video/mp4" />
        </video>

        <div
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
        </div>
      </div>

      {/* End Tbale orj irne */}

      <div>
        <TourGrid />
      </div>

      <Footer />
    </>
  );
}
