import ResetPassword from "@/components/Auth/ResetPassword";
import React from "react";

const page = ({ params }: any) => {
  return <ResetPassword token={params.token} />;
};

export default page;
