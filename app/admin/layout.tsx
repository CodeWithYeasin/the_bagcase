import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    redirect("/auth?mode=admin");
  }

  return (
    <section className="min-h-screen bg-cream" data-theme="light">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <div className="p-6 lg:p-10">{children}</div>
      </div>
    </section>
  );
}
