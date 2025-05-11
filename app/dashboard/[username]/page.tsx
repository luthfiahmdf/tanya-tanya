import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { ModuleDashboard } from "../../modules/dashboard";

export const metadata: Metadata = {
  title: "Tanya-Tanya - Dashboard",
  description: "Dashboard Tanya",
  icons: {
    icon: "/icon.ico",
  },
};

const DashboardModule: NextPage = (): ReactElement => (
  <section key="register-lentera-pos" className="min-h-screen bg-[#FFFAF0]">
    <ModuleDashboard />
  </section>
);
export default DashboardModule;
