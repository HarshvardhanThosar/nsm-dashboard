"use client";

import React from "react";
import Image from "next/image";

// D A T A
import transactions from "@/data/transactions.json";

// A S S E T S
import BackIcon from "@/assets/icons/arrow-left.svg";
import FilterBars from "@/assets/icons/filter-bars.svg";

// S T Y L E S
import DocumentListingAsideStyles from "./styles.module.scss";

// C O M P O N E N T S
import DocumentListItem from "@/components/molecular/documentlistitem";

function DocumentListingAside() {
  const phases_count = 12,
    folder_count = 23,
    document_count = 1235;
  const [datalist, setDatalist] = React.useState([]);
  const [filterSearchKey, setFilterSearchKey] = React.useState("");

  const handleSearch = () => {};

  React.useEffect(() => {}, []);

  return (
    <aside
      id="document_listing_aside"
      className={DocumentListingAsideStyles.document_listing_aside}
    >
      <div className={DocumentListingAsideStyles.meta_container_col}>
        <div className={DocumentListingAsideStyles.user_controls_row}>
          <h2 id="user_name">Muamele Münderecatı</h2>
          <button className={DocumentListingAsideStyles.icon_button}>
            <Image
              key="aside_back"
              width={32}
              src={BackIcon}
              alt="Back"
              title="Back"
            />
          </button>
        </div>
        <div className={DocumentListingAsideStyles.document_controls_row}>
          <div className={DocumentListingAsideStyles.count_preview_col}>
            <h2>{phases_count}</h2>
            <span>Aşama</span>
          </div>
          <div className={DocumentListingAsideStyles.count_preview_col}>
            <h2>{folder_count}</h2>
            <span>Alt Klasör</span>
          </div>
          <div className={DocumentListingAsideStyles.count_preview_col}>
            <h2>{document_count}</h2>
            <span>Doküman</span>
          </div>
          <button className={DocumentListingAsideStyles.icon_button}>
            <Image
              key="aside_filter"
              width={22}
              src={FilterBars}
              alt="Filter"
              title="Filter"
            />
          </button>
        </div>
      </div>
      <div className={DocumentListingAsideStyles.list_container_col}>
        <form
          action=""
          className={DocumentListingAsideStyles.filter_controls_form_row}
        >
          <input
            list="documents_listed"
            type="text"
            name="search_from_listing"
            id="search_from_listing"
            placeholder="Filter by Client/Matter name"
            className={DocumentListingAsideStyles.filter_controls_search}
          />
          <datalist id="documents_listed"></datalist>
          <button disabled className={DocumentListingAsideStyles.icon_button}>
            <Image
              key="aside_filter"
              width={22}
              src={FilterBars}
              alt="Filter"
              title="Filter"
            />
          </button>
        </form>
        <div className={DocumentListingAsideStyles.document_list_container}>
          <ul className={DocumentListingAsideStyles.document_list}>
            {transactions.map((_item, index) => (
              <DocumentListItem key={_item?._id} item={_item} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default DocumentListingAside;
