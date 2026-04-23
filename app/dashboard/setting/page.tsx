import { NextPage } from "next";
import { ReactElement } from "react";
import { SettingModule } from "@/app/modules/setting";

const SettingPage: NextPage = (): ReactElement => (
  <section key="setting-section" className="min-h-screen bg-[#F5F5F5]">
    <SettingModule />
  </section>
);
export default SettingPage;
