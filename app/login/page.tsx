import { NextPage } from "next";
import { ReactElement } from "react";
import { Metadata } from "next";
import ModuleLogin from "../modules/login";

export const metadata: Metadata = {
  title: "Login ",
  description: "Login Tanya-Tanya",
  icons: {
    icon: "/icon.ico",
  },
};

const ModuleLoginPage: NextPage = (): ReactElement => (
  <section key="login-tanya-tanya">
    <ModuleLogin />
  </section>
);
export default ModuleLoginPage;
