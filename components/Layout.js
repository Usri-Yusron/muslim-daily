import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="relative isolate ">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
