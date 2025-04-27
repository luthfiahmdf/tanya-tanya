import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import { TestPage } from "../modules/test";

export const metadata: Metadata = {
  title: "Test Page",
  description: "kirim pesan",
  icons: {
    icon: "/icon.ico",
  },
};

const QNAModule: NextPage = (): ReactElement => (
  <section key="qna">
    <TestPage />
  </section>
);
export default QNAModule;
