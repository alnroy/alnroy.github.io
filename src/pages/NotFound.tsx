import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] text-[#fafafa] p-6 selection:bg-white selection:text-black">
      <div className="card-noir rounded-2xl p-8 sm:p-12 text-center max-w-md w-full border border-[#27272a] space-y-5">
        <div className="font-mono text-xs text-[#71717a] uppercase tracking-widest">
          ERROR 404 // NOT FOUND
        </div>
        <h1 className="font-display text-6xl font-black text-[#fafafa]">404</h1>
        <p className="font-mono text-sm text-[#a1a1aa]">
          The requested coordinate <span className="text-[#fafafa] font-semibold">{location.pathname}</span> does not exist in this system.
        </p>
        <div className="pt-2">
          <Link to="/" className="btn-retro-primary inline-flex">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
