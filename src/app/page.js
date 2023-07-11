"use client";

import React from "react";
import TabNavigation from "@/components/organisms/tabnav";
import TransactionTab from "@/components/organisms/transactiontab";

export default function Home() {
  React.useLayoutEffect(() => {
    console.log(
      `%cDeveloped by Harshvardhan Thosar`,
      "background: #0d0d0d; color: #fff; padding: 10px 15px; border-radius:5px; font-family:'Montserrat', sans-serif;"
    );
    console.log(
      `%cLinkedIn: https://www.linkedin.com/in/harshvardhanthosar/`,
      "background: #0e76a8; color: #fff; padding: 10px 15px; border-radius:5px; font-family:'Montserrat', sans-serif;"
    );
    console.log(
      `%cSource Code: https://github.com/HarshvardhanThosar/nsm-dashboard`,
      "background: #333333; color: #fff; padding: 10px 15px; border-radius:5px; font-family:'Montserrat', sans-serif;"
    );
    console.log(
      `%cLive Link:  https://nsm-dashboard-4p4k.vercel.app/`,
      "background: #333333; color: #fff; padding: 10px 15px; border-radius:5px; font-family:'Montserrat', sans-serif;"
    );
  }, []);
  return (
    <main>
      <TabNavigation />
      <TransactionTab />
    </main>
  );
}
