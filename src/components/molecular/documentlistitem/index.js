import React from "react";
import Image from "next/image";
import { clsx } from "clsx";

// A S S E T S
import SubTreeClosed from "@/assets/icons/caret-right.svg";
import SubTreeOpen from "@/assets/icons/caret-down.svg";
import Folder from "@/assets/icons/folder.svg";
import InfoButton from "@/assets/icons/info-circle-solid.svg";

// S T Y L E S
import TransactionTabStyles from "@/components/organisms/transactiontab/styles.module.scss";
import DocumentListItemStyles from "./styles.module.scss";

function DocumentListItem({ item }) {
  const [showSubtree, setShowSubtree] = React.useState(false);
  const toggleSubtreeVisibility = () => setShowSubtree((current) => !current);

  return (
    <li
      className={DocumentListItemStyles.document_list_item}
      id={item?.id + "document-preview"}
      key={item?.id + "document-preview"}
    >
      <div className={DocumentListItemStyles.document_container}>
        <button
          className={DocumentListItemStyles.subtree_icon}
          onClick={toggleSubtreeVisibility}
        >
          {item?.children?.length > 0 ? (
            showSubtree ? (
              <Image
                width={24}
                src={SubTreeOpen}
                alt="Folder"
                title="Close folder"
              />
            ) : (
              <Image
                width={24}
                src={SubTreeClosed}
                alt="Folder"
                title="Open folder"
              />
            )
          ) : (
            <Image
              width={24}
              src={SubTreeClosed}
              alt="Folder"
              title="No subfolders or files"
            />
          )}
        </button>
        <button className={DocumentListItemStyles.icon_and_name}>
          <Image width={20} src={Folder} alt="Folder" title="Folder" />
          <span>{item?.name}</span>
        </button>
        <button className={DocumentListItemStyles.info}>
          <Image width={18} src={InfoButton} alt="Info" title="Info" />
        </button>
      </div>
      <ul
        data-inner={true}
        hidden={!showSubtree}
        className={clsx([
          TransactionTabStyles.document_list,
          TransactionTabStyles.document_list_inner,
        ])}
      >
        {item?.children.map((_item, index) => (
          <DocumentListItem item={_item} key={_item?._id ?? index} />
        ))}
      </ul>
    </li>
  );
}

export default DocumentListItem;
