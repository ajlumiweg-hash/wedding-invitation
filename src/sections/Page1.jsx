function Page1() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-[#9E6F3D]">

      {/* Bismillah */}
      <p
        dir="rtl"
        className="text-3xl font-bold mb-7 text-center"
        style={{
          fontFamily: "serif",
          letterSpacing: "0.02em",
        }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </p>

      {/* Welcome */}
      <h1 className="font-dream text-7xl text-center text-[#9E6F3D]">
        Welcome
      </h1>


      {/* Subtitle */}
      <p className="text-sm font-semibold mt-2 tracking-wide">
        to Our Wedding Reception
      </p>

      {/* Divider */}
      <div className="flex items-center gap-3 mt-5">
        <div className="w-16 h-[4px] bg-[#9E6F3D] rounded-full" />

        <div className="text-[#9E6F3D] text-2xl leading-none">
          ♥
        </div>

        <div className="w-16 h-[4px] bg-[#9E6F3D] rounded-full" />
      </div>

      {/* Message */}
      <div className="text-center mt-10">
        <p className="text-xl font-bold leading-[1.45]">
          With Allah&apos;s blessings and
          <br />
          endless grace,
          <br />
          Two hearts become one
          <br />
          eternal story.
        </p>
      </div>

    </section>
  );
}

export default Page1;