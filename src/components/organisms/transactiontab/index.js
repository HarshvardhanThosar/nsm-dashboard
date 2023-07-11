"use client";

import React from "react";
import dynamic from "next/dynamic";

// S T Y L E S
import TransactionTabStyles from "./styles.module.scss";

// C O M P O N E N T S
import DocumentListingAside from "../documentlistingaside";

const TableSectionWithNoSSR = dynamic(() => import("../tablesection"), {
  ssr: false,
});

function TransactionTab() {
  return (
    <React.Fragment>
      <section className={TransactionTabStyles.transaction_tab}>
        <DocumentListingAside />
        <TableSectionWithNoSSR />
      </section>
    </React.Fragment>
  );
}

export default TransactionTab;
