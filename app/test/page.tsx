import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { TestingColor } from "../modules/test";

export const metadata: Metadata = {
  title: "Test Page",
  description: "kirim pesan",
  icons: {
    icon: "/icon.ico",
  },
};

const QNAModule: NextPage = (): ReactElement => (
  <section key="qna">
    <TestingColor />
  </section>
);
export default QNAModule;
