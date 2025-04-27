import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import QnaModule from "@/app/modules/qna";

export const metadata: Metadata = {
  title: "Kirim Pesan",
  description: "kirim pesan",
  icons: {
    icon: "/icon.ico",
  },
};

const QNAModule: NextPage = (): ReactElement => (
  <section key="qna">
    <QnaModule />
  </section>
);
export default QNAModule;
