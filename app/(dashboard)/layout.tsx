import { Sidebar } from "../../app/(dashboard)/_components/sidebar";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* Navbar */}
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="md:pl-56 pt-[80px] h-full flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
