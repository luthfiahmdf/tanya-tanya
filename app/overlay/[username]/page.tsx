import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { Overlay } from "@/app/modules/overlay";
import { Viga } from "next/font/google";
export const metadata: Metadata = {
  title: "Overlay",
  description: "Dashboard POS Lentera",
  icons: {
    icon: "/favicon.ico",
  },
};
const viga = Viga({ subsets: ["latin"], weight: "400", })
const OverlayModule: NextPage = (): ReactElement => (
  <section key="overlay" className={viga.className}>
    <Overlay />
  </section>
);
export default OverlayModule;
