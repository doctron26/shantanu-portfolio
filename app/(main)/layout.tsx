import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ShaderBackground from "@/components/layout/ShaderBackground";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShaderBackground />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
}
