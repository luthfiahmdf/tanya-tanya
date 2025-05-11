import { NextPage } from "next";
import { ReactElement } from "react";
import { SettingModule } from "@/app/modules/setting";

const SettingPage: NextPage = (): ReactElement => (
  <section key="setting-section" className="min-h-screen bg-[#FFFAF0]">
    <SettingModule />
  </section>
);
export default SettingPage;
