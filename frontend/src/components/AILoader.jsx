import "./AILoader.css";

export default function AILoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 text-center">
        <div className="flex justify-center">
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
        </div>
        <h2 className="mt-8 text-2xl font-bold text-gray-900">ClaimBrain AI</h2>
        <p className="mt-3 text-gray-600">Analyzing your insurance policy...</p>
        <p className="mt-1 text-sm text-gray-400">Extracting vehicle details, owner information and policy data.</p>
      </div>
    </div>
  );
}