import "./AILoader.css";

export default function AILoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="loader">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <mask id="clipping">
              <polygon points="0,0 100,0 100,100 0,100" fill="black" />
              <polygon points="25,25 75,25 50,75" fill="white" />
              <polygon points="50,25 75,75 25,75" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
              <polygon points="35,35 65,35 50,65" fill="white" />
            </mask>
          </defs>
        </svg>
        <div className="box"></div>
      </div>
      <h2 className="mt-12 text-3xl font-bold text-white">ClaimBrain AI</h2>
      <p className="mt-3 text-lg text-gray-800">Analyzing your insurance policy...</p>
      <p className="mt-2 text-sm text-gray-800">Extracting vehicle details, owner information and policy data.</p>
    </div>
  );
}