import { Metadata } from "next";
import ModuleRegister from "../modules/register";
import { NextPage } from "next";
import { ReactElement } from "react";
export const metadata: Metadata = {
  title: "Register",
  description: "Register Tanya-Tanya",
  icons: {
    icon: "/icon.ico"
  }
}



const ModuleRegisterPage: NextPage = (): ReactElement => (
  <section key="register Tanya-Tanya">
    <ModuleRegister />
  </section>
)
export default ModuleRegisterPage;
