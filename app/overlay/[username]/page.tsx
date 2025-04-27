import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { Overlay } from "@/app/modules/overlay";

export const metadata: Metadata = {
  title: "Overlay",
  description: "Dashboard POS Lentera",
  icons: {
    icon: "/favicon.ico",
  },
};

const OverlayModule: NextPage = (): ReactElement => (
  <section key="overlay">
    <Overlay />
  </section>
);
export default OverlayModule;
