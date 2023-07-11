"use client";

import React from "react";

// S T Y L E S
import TransactionTabStyles from "./styles.module.scss";

// C O M P O N E N T S
import DocumentListingAside from "../documentlistingaside";
import TableSection from "../tablesection";

function TransactionTab() {
  return (
    <React.Fragment>
      <section className={TransactionTabStyles.transaction_tab}>
        <DocumentListingAside />
        <TableSection />
      </section>
    </React.Fragment>
  );
}

export default TransactionTab;
