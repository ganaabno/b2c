export default function Home() {
  return (
    <>
      <div className="w-screen min-h-max overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="flex flex-col items-center mt-40">
        <h1>Аяал Хайх</h1>
        <div className="bg-white p-12 mt-4">
          <h2>Боломжит Аялалууд:</h2>
          <div></div>
        </div>
      </div>

      <h1>Here is the home page</h1>
    </>
  );
}
