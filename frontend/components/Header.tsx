'use client'
export default function Header() {
  return (
    <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">
          The easiest way to
          <br />
          <i>
            <span className="bg-green-200">find student housing.</span>
          </i>
        </h1>
        <p>Find your perfect rental, sublet, or roommate.</p>
        <a href="/login" className="px-3 py-1.5 bg-emerald-300 font-semibold hover:-translate-y-[2px] hover:shadow-md text-emerald-900 max-w-[120px] flex items-center justify-center rounded-lg duration-150 ease-in-out">Get Started</a>
      </div>

      <img
        className="rounded-xl shadow-sm max-w-[300px] md:max-w-[400px]"
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.designcafe.com%2Fwp-content%2Fuploads%2F2019%2F11%2F17060449%2FQ4aC8wUjahqVLa2vUA5BgXRrzAJSMzDFlwwZ8QFwAhGlDx4fAgLyCZ7ASBin-V9DxAGxg-0R0ngsCX75Fm5KI53AhRsrNnOVSCBCZ5usrlkXhSlyUp7dGFkRWVC1lvLVLOZNNaUX.jpeg&f=1&nofb=1&ipt=cc4d1c7e74341cfe64f6307ee3869ed5545d8e3ece5c1389d7e3ec5684e5618c&ipo=images"
        alt=""
      />
    </div>
  );
}
