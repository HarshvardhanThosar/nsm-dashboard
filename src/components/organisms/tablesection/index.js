"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

// A S S E T S
import HomeIcon from "@/assets/icons/house-solid.svg";
import ForwardBreadcrumbIcon from "@/assets/icons/chevron-right.svg";
import Folder from "@/assets/icons/folder.svg";
import CheveronDown from "@/assets/icons/chevron-down.svg";
import Search from "@/assets/icons/search.svg";
import Mic from "@/assets/icons/microphone.svg";
import Download from "@/assets/icons/arrow-down-to-line.svg";
import Filter from "@/assets/icons/filter.svg";
import CaretDown from "@/assets/icons/caret-down.svg";
import WordDoc from "@/assets/icons/word-blue.svg";
import Ellipses from "@/assets/icons/ellipsis.svg";
import Close from "@/assets/icons/xmark.svg";
import SubTreeClosed from "@/assets/icons/caret-right.svg";
import SubTreeOpen from "@/assets/icons/caret-down.svg";

// DATA
import transactions_array from "@/data/transactions.json";
import statuses_object from "@/data/statuses.json";

// S T Y L E S
import TableSectionStyles from "./styles.module.scss";

const Breadcrumb = ({ name }) => (
  <span>
    <Image height={9} src={ForwardBreadcrumbIcon} alt="" title="Forward" />
    {name}
  </span>
);

function TableSection() {
  const [rowSelected, setRowSelected] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const dialogRef = React.useRef();

  const openModal = (id) => {
    if (!dialogRef?.current?.open) {
      dialogRef?.current?.showModal();
      setShowModal(true);
      setRowSelected(id);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setRowSelected(null);

    const closingAnimationTimeout = setTimeout(() => {
      if (dialogRef?.current) {
        dialogRef?.current?.close();
      }
    }, 500);
    return () => {
      clearTimeout(closingAnimationTimeout);
    };
  };

  return (
    <section
      id="table_section"
      className={TableSectionStyles.table_section}
      data-modal-active={showModal}
    >
      <div className={TableSectionStyles.breadcrumbs_container}>
        <span className={TableSectionStyles.icon_container}>
          <Image width={20} alt="Home" title="Home" src={HomeIcon} />
        </span>
        <ul>
          <li>
            <Breadcrumb name="CLIENT" />
          </li>
          <li>
            <Breadcrumb name="MATTER" />
          </li>
          <li>
            <Breadcrumb name="MUAMELE DETAY SAYFASI" />
          </li>
          <li>
            <Breadcrumb name="MUAMELE MÜNDERECATI" />
          </li>
        </ul>
      </div>
      <div id="table_layout" className={TableSectionStyles.table_layout}>
        <div className={TableSectionStyles.filter_controls}>
          <div className={TableSectionStyles.search_container}>
            <button className={TableSectionStyles.folder_drop_down_container}>
              <div className={TableSectionStyles.icon_container}>
                <Image
                  height={12}
                  src={Folder}
                  alt="Folder Filter"
                  title="Folder Filter"
                />
              </div>
              <p>All (selected folder)</p>
              <Image with={12} src={CheveronDown} alt="" />
            </button>
            <form className={TableSectionStyles.search_form}>
              <div className={TableSectionStyles.icon_container}>
                <Image height={14} src={Search} alt="Search" title="Search" />
              </div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Search within all folders and content, or a specific folder’s content"
              />
              <div className={TableSectionStyles.icon_container}>
                <Image
                  height={14}
                  src={Mic}
                  alt="Search with audio"
                  title="Search with audio"
                />
              </div>
            </form>
          </div>
          <div className={TableSectionStyles.phases_drop_down}>
            <p>All Status</p>
            <Image with={12} src={CheveronDown} alt="" />
          </div>
          <button className={TableSectionStyles.icon_container}>
            <Image src={Download} alt="Export" title="Export" />
          </button>
          <button className={TableSectionStyles.icon_container}>
            <Image src={Filter} alt="Filter" title="Filter" />
          </button>
        </div>
        <div
          id="table_container"
          className={TableSectionStyles.table_container}
        >
          <table>
            <thead>
              <tr>
                <th>
                  <span>#</span>
                  <button>
                    Phase
                    <Image alt="" src={CaretDown} width={18} height={18} />
                  </button>
                </th>
                <th>
                  <button>
                    Status
                    <Image alt="" src={CaretDown} width={18} height={18} />
                  </button>
                </th>
                <th>
                  <button>
                    Document
                    <Image alt="" src={CaretDown} width={18} height={18} />
                  </button>
                </th>
                <th>
                  <button>
                    Responsible Party
                    <Image alt="" src={CaretDown} width={18} height={18} />
                  </button>
                </th>
                <th />
                <th>
                  <button>
                    Update Date
                    <Image alt="" src={CaretDown} width={18} height={18} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions_array.map((_transaction, index) => (
                <TransactionTableRowItem
                  rowSelected={rowSelected}
                  item={_transaction}
                  key={_transaction?._id ?? index}
                  openModal={openModal}
                />
              ))}
            </tbody>
          </table>
        </div>
        <QuickMenu />
      </div>
      {ReactDOM.createPortal(
        <TransactionDetailsDialog
          dialogRef={dialogRef}
          active={showModal}
          onClose={closeModal}
        />,
        document.body
      )}
    </section>
  );
}

const TransactionDetailsDialog = ({ dialogRef, active, onClose }) => {
  const [tabSelected, setTabSelected] = React.useState("detail");

  return (
    <dialog
      id="portal-dialog"
      ref={dialogRef}
      className={active ? "active" : ""}
    >
      <div className="modal_container">
        <header className="header">
          <div className="document_icon">
            <Image alt="" src={WordDoc} height={20} width={20} />
          </div>
          <div className="col">
            <h2>
              Gizlilik Sözleşmesi <span>Completed</span>{" "}
            </h2>
            <h5>V. 1.4 | (Current Version)</h5>
          </div>
          <button>
            <Image alt="" src={Ellipses} height={14} width={14} />
          </button>
          <button onClick={onClose}>
            <Image alt="" src={Close} height={14} width={14} />
          </button>
        </header>
        <div className="tabs_row">
          <button
            data-active={tabSelected === "detail" ? true : false}
            id="detail"
            onClick={() => setTabSelected("detail")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="14.396"
              viewBox="0 0 20 14.396"
            >
              <g
                id="Group_43448"
                data-name="Group 43448"
                transform="translate(-414.06 -674.367)"
              >
                <path
                  id="Path_44639"
                  data-name="Path 44639"
                  d="M433.875,687.625l-.659-.758-1.721-1.968.019-.016.02-.018a6.266,6.266,0,1,0-1.069.946l.017-.014.056.058c.041.045.074.079.105.118q1.105,1.27,2.218,2.538l.04.045a.652.652,0,0,0,.462.2.085.085,0,0,0,.023,0,.666.666,0,0,0,.466-.188A.673.673,0,0,0,433.875,687.625Zm-2.077-6.939a4.93,4.93,0,1,1-5.05-4.962l.032,0h.123a4.935,4.935,0,0,1,4.895,4.966Z"
                  fill="#7e8b9f"
                />
                <path
                  id="Path_44640"
                  data-name="Path 44640"
                  d="M420.953,675.723a.646.646,0,0,0-.593-.422h-3.833q-.89,0-1.781,0a.683.683,0,0,0-.482.2.675.675,0,0,0,.482,1.149H420.3a.688.688,0,0,0,.522-.221A.636.636,0,0,0,420.953,675.723Z"
                  fill="#7e8b9f"
                />
                <path
                  id="Path_44641"
                  data-name="Path 44641"
                  d="M419.424,682.779h0l-1.112,0-1.267,0H414.8c-.039,0-.063,0-.089,0a.661.661,0,0,0-.649.67c0,.019,0,.036,0,.055a.68.68,0,0,0,.673.622.25.25,0,0,0,.045,0c.757,0,1.519.005,2.281.005s1.522,0,2.276-.005a.9.9,0,0,0,.39-.092.664.664,0,0,0,.163-1.043A.65.65,0,0,0,419.424,682.779Z"
                  fill="#7e8b9f"
                />
                <path
                  id="Path_44642"
                  data-name="Path 44642"
                  d="M414.756,680.38h3.653a.675.675,0,0,0,.47-1.155.658.658,0,0,0-.477-.193c-1.2,0-2.412,0-3.607,0a.674.674,0,0,0-.039,1.347Z"
                  fill="#7e8b9f"
                />
              </g>
            </svg>
            Detail
          </button>
          <button
            data-active={tabSelected === "version" ? true : false}
            id="version"
            onClick={() => setTabSelected("version")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.963"
              height="16"
              viewBox="0 0 17.963 16"
            >
              <g
                id="Group_43361"
                data-name="Group 43361"
                transform="translate(-629.124 -435.454)"
              >
                <path
                  id="Path_44384"
                  data-name="Path 44384"
                  d="M647.086,437.684a2.129,2.129,0,0,0-2.218-2.227q-3.816-.008-7.635,0a2.3,2.3,0,0,0-.621.079,2.122,2.122,0,0,0-1.595,2.147v7.3q0,2.1,0,4.193a2.441,2.441,0,0,0,.085.686,2.1,2.1,0,0,0,2.129,1.585l3.527,0q2.043,0,4.086,0a2.288,2.288,0,0,0,.644-.083,2.123,2.123,0,0,0,1.595-2.166Q647.087,443.444,647.086,437.684Zm-10.807,4.372c0-1.453,0-2.906.007-4.359a1.421,1.421,0,0,1,.147-.618c.132-.255.371-.36.824-.361q1.126,0,2.253,0h2.2c1.017,0,2.031,0,3.046.009a1.7,1.7,0,0,1,.708.153c.246.118.357.357.357.776q0,5.791,0,11.583a.834.834,0,0,1-.955.954q-3.819.008-7.634,0c-.51,0-.8-.181-.9-.566a1.952,1.952,0,0,1-.051-.5q0-2.236,0-4.473v-1.071h0Z"
                  fill="#7E8B9F"
                />
                <path
                  id="Path_44385"
                  data-name="Path 44385"
                  d="M632.689,436.938c-.228,0-.61.111-.612.8v11.41a1.951,1.951,0,0,0,.019.306.605.605,0,0,0,.6.513.7.7,0,0,0,.135-.014c.229-.047.5-.211.5-.721V437.715a.833.833,0,0,0-.208-.616A.647.647,0,0,0,632.689,436.938Z"
                  fill="#7E8B9F"
                />
                <path
                  id="Path_44386"
                  data-name="Path 44386"
                  d="M630.367,438.916a.585.585,0,0,0-.554-.5.6.6,0,0,0-.472.146.8.8,0,0,0-.217.615q0,4.275,0,8.551a1.334,1.334,0,0,0,.04.315.579.579,0,0,0,.588.449h.03a.589.589,0,0,0,.583-.5,1.987,1.987,0,0,0,.017-.307V439.18A1.54,1.54,0,0,0,630.367,438.916Z"
                  fill="#7E8B9F"
                />
              </g>
            </svg>
            Version
          </button>
        </div>
        {
          {
            detail: (
              <div className="tab" id="detail-tab">
                <h4>
                  Updated by <span>Fatma Gözde Kardeş</span>&nbsp;23.01.2023 |
                  21:45:43
                </h4>
                <div className="col">
                  <div className="row">
                    <label className="label">Phase Description:</label>
                    <div className="input">
                      <textarea
                        defaultValue={
                          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label className="label">Status/Date:</label>
                    <div className="input">
                      <div className="box">dummy text</div>
                    </div>
                  </div>
                  <div className="row">
                    <label className="label">Check List:</label>
                    <div className="input">
                      <div className="box">dummy text</div>
                    </div>
                  </div>
                  <div className="row">
                    <label className="label">Doc. Type:</label>
                    <div className="input">
                      <div className="box">dummy text</div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            version: (
              <div className="tab" id="version-tab">
                <div className="col">
                  <div className="row">
                    <h4 className="label">4 Kayıt</h4>
                    <button>Add New</button>
                  </div>
                </div>
              </div>
            ),
          }[tabSelected]
        }
      </div>
    </dialog>
  );
};

const TransactionTableRowItem = ({ item, ...props }) => {
  const [showSubtree, setShowSubtree] = React.useState(false);

  const toggleSubtreeVisibility = (e) => {
    e.stopPropagation();
    setShowSubtree((current) => !current);
  };

  return (
    <React.Fragment>
      <tr
        data-active={props.rowSelected == item?._id}
        onClick={() => props.openModal(item?._id)}
      >
        <td
          data-cell="id"
          data-marker={item?.marker ? "true" : "false"}
          data-inner={props?.indent ? true : false}
        >
          <div
            className={TableSectionStyles.counter_container}
            style={{
              paddingLeft: `calc( ${props?.indent?.length ?? 0} * 1rem )`,
            }}
          >
            <button
              className={TableSectionStyles.subtree_icon}
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
            <span>{item?._id}</span>
          </div>
          <div className={TableSectionStyles.col}>
            <h3>{item?.phase}</h3>
            <p>{item?.subphase}</p>
          </div>
        </td>
        <td data-cell="status">
          <h3 data-status={statuses_object[item?.status ?? 0]?.id}>
            {statuses_object[item?.status ?? 0]?.name}
          </h3>
        </td>
        <td data-cell="document">
          {item?.version ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="17.246"
                viewBox="0 0 18 17.246"
              >
                <g
                  id="Group_175128"
                  data-name="Group 175128"
                  transform="translate(-629.105 -1406.933)"
                  opacity="0.995"
                >
                  <path
                    id="Path_80809"
                    data-name="Path 80809"
                    d="M642.506,1406.933h-7.473a1.724,1.724,0,0,0-1.724,1.724v13.8a1.724,1.724,0,0,0,1.724,1.725h10.348a1.724,1.724,0,0,0,1.724-1.725v-10.923A4.6,4.6,0,0,0,642.506,1406.933Zm.746.992a3.868,3.868,0,0,1,2.861,2.861h-2.565a.3.3,0,0,1-.3-.3Zm2.129,15.391H635.033a.862.862,0,0,1-.862-.862v-13.8a.862.862,0,0,1,.862-.862h7.33v2.695a1.186,1.186,0,0,0,1.185,1.185h2.7v10.779A.863.863,0,0,1,645.381,1423.316Z"
                    fill="#5b7084"
                  />
                  <rect
                    id="Rectangle_24849"
                    data-name="Rectangle 24849"
                    width="9.725"
                    height="10.697"
                    rx="1.889"
                    transform="translate(629.105 1410.693)"
                    fill="#005bba"
                  />
                  <g id="W-2-2">
                    <g id="W-2-3">
                      <g id="Group_37214" data-name="Group 37214">
                        <path
                          id="Path_38882"
                          data-name="Path 38882"
                          d="M634.975,1418.374l-.788-3.082-.781,3.082H632.39l-1.285-4.49h1.07l.788,3.243.85-3.243h.747l.85,3.243.783-3.243h1.077l-1.279,4.489Z"
                          fill="#fff"
                        />
                      </g>
                    </g>
                  </g>
                  <path
                    id="Path_39742"
                    data-name="Path 39742"
                    d="M644.943,1414.537h-4.6a.43.43,0,0,1-.431-.43h0a.429.429,0,0,1,.43-.43h4.6a.43.43,0,0,1,.431.43h0a.431.431,0,0,1-.429.431Z"
                    fill="#4b99ea"
                  />
                  <path
                    id="Path_39743"
                    data-name="Path 39743"
                    d="M644.943,1416.262h-4.6a.43.43,0,0,1-.431-.43h0a.43.43,0,0,1,.43-.431h4.6a.431.431,0,0,1,.431.431h0a.431.431,0,0,1-.429.431Z"
                    fill="#005bba"
                  />
                  <path
                    id="Path_39744"
                    data-name="Path 39744"
                    d="M644.943,1417.987h-4.6a.43.43,0,0,1-.431-.43h0a.43.43,0,0,1,.43-.431h4.6a.431.431,0,0,1,.431.431h0a.431.431,0,0,1-.429.431Z"
                    fill="#005bba"
                  />
                </g>
              </svg>
              <h3>{item?.version}</h3>
            </div>
          ) : null}
        </td>
        <td data-cell="responsible">
          <h3>{item?.responsible_party}</h3>
        </td>
        <td data-cell="comments">
          <div className={TableSectionStyles.comment_icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.681"
              height="17.712"
              viewBox="0 0 17.681 17.712"
            >
              <path
                id="Path_80809"
                data-name="Path 80809"
                d="M510.19,1377.433c.362-.034.736-.068,1.1-.132a8.835,8.835,0,1,0-9.421-4.568.537.537,0,0,1,.038.371c-.11.4-.227.786-.345,1.175l-.1.347q-.288.95-.569,1.9l-.015.043a.664.664,0,0,0,.431.832.917.917,0,0,0,.485,0c.669-.191,1.337-.391,2.005-.59.463-.138.925-.277,1.389-.412a.526.526,0,0,1,.142-.019.553.553,0,0,1,.23.051,9.457,9.457,0,0,0,4.129,1.059h0C509.865,1377.463,510.027,1377.448,510.19,1377.433Zm-.523-1.362a7.319,7.319,0,0,1-3.737-1.024.912.912,0,0,0-.79-.092c-.511.161-1.023.313-1.533.464l-.678.2c-.033.01-.066.017-.123.03l-.3.228.123-.376c.071-.235.139-.469.207-.7.159-.545.31-1.061.48-1.58a1.028,1.028,0,0,0-.1-.909,7.41,7.41,0,1,1,6.454,3.757Z"
                transform="translate(-500.838 -1359.774)"
                fill="#E6EAF4"
              />
            </svg>
            <h3>{item?.comment_count ?? 0}</h3>
          </div>
        </td>
        <td data-cell="update">
          <h3>{item?.updated_on}</h3>
        </td>
      </tr>

      {showSubtree
        ? item?.children.map((_item, index) => (
            <TransactionTableRowItem
              inner="true"
              item={_item}
              key={_item?._id ?? index}
              indent={[...(props?.indent ?? []), index]}
              openModal={props?.openModal}
            />
          ))
        : null}
    </React.Fragment>
  );
};

const HomeQuickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17.456"
    height="17.534"
    viewBox="0 0 17.456 17.534"
  >
    <path
      id="Path_44443"
      data-name="Path 44443"
      d="M639.765,415.036h4.9a2.151,2.151,0,0,0,2.149-2.125v-6.919a1.232,1.232,0,0,0-.372-.877l-7.514-7.283a1.239,1.239,0,0,0-1.684,0l-7.513,7.281a1.229,1.229,0,0,0-.373.878v6.92a2.15,2.15,0,0,0,2.147,2.123h4.9a1.222,1.222,0,0,0,1.216-1.22v-3.781a.43.43,0,0,1,.465-.382.436.436,0,0,1,.465.382v3.782A1.222,1.222,0,0,0,639.765,415.036Zm-1.613-6.794a1.874,1.874,0,0,0-1.944,1.8v3.583h-4.72a.739.739,0,0,1-.729-.706V406.07l7.322-7.094,7.321,7.094v6.842a.769.769,0,0,1-.764.715h-4.684v-3.593A1.879,1.879,0,0,0,638.152,408.242Z"
      transform="translate(-629.355 -397.503)"
    />
  </svg>
);

const RightAlignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24.434"
    height="16.967"
    viewBox="0 0 24.434 16.967"
  >
    <g id="list-ul-align-right" transform="translate(1.176 -4.695)">
      <path
        id="Path_80809"
        data-name="Path 80809"
        d="M-.326,6.438H22.365a.871.871,0,1,0,0-1.743H-.326a.871.871,0,0,0-.871.871.871.871,0,0,0,.871.871h0Z"
        transform="translate(0.022)"
      />
      <path
        id="Path_80810"
        data-name="Path 80810"
        d="M22.365,13.363H-.326a.871.871,0,0,0-.871.871.871.871,0,0,0,.871.871H22.365a.871.871,0,1,0,0-1.743Z"
        transform="translate(0.022 1.483)"
      />
      <path
        id="Path_80811"
        data-name="Path 80811"
        d="M21.624,17.695H3.422a.871.871,0,1,0,0,1.743h18.2a.871.871,0,1,0,0-1.743Z"
        transform="translate(0.763 2.224)"
      />
      <path
        id="Path_80814"
        data-name="Path 80814"
        d="M21.624,9.031H3.448a.871.871,0,1,0,0,1.743H21.624a.871.871,0,1,0,0-1.743Z"
        transform="translate(0.763 0.742)"
      />
    </g>
  </svg>
);

const TasksIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15.798"
    height="20"
    viewBox="0 0 15.798 20"
  >
    <g
      id="Group_43363"
      data-name="Group 43363"
      transform="translate(-501.779 -433.444)"
    >
      <path
        id="Path_44391"
        data-name="Path 44391"
        d="M517.467,437.644a3.029,3.029,0,0,0-2.915-2.224h-2.627V434.1a.655.655,0,0,0-.651-.65q-1.6-.008-3.2-.008a.638.638,0,0,0-.64.624v1.352H504.8a3.029,3.029,0,0,0-2.916,2.224,3.246,3.246,0,0,0-.11.841v12.091a2.334,2.334,0,0,0,.093.6l.005.035a2.992,2.992,0,0,0,1.244,1.725c.06.039.123.078.186.115a2.967,2.967,0,0,0,.776.3,2.587,2.587,0,0,0,.265.053c.029.006.051.008.074.011l.061.008a1.662,1.662,0,0,0,.224.015H514.78a.887.887,0,0,0,.215-.032,3.375,3.375,0,0,0,2.51-2.306,1.725,1.725,0,0,0,.072-.487v-12.14A3.223,3.223,0,0,0,517.467,437.644Zm-8.706-1.578c0-.243,0-.485,0-.727q0-.216,0-.432v-.127h1.812l.018,2.118a1.677,1.677,0,0,1-.132.811.89.89,0,0,1-.612.452.975.975,0,0,1-.185.018.891.891,0,0,1-.564-.2,1.082,1.082,0,0,1-.346-.808,5.043,5.043,0,0,1,0-.673C508.758,436.356,508.764,436.21,508.761,436.066Zm6.916,15.61a1.718,1.718,0,0,1-1.249.431h-.8l-.655,0c-1.078,0-2.293.007-3.234,0l-.106.006H504.93c-.032,0-.065,0-.1,0a1.88,1.88,0,0,1-.244-.017,1.7,1.7,0,0,1-.485-.143c-.051-.024-.1-.049-.147-.077a1.721,1.721,0,0,1-.849-1.377V438.558a1.731,1.731,0,0,1,.821-1.555,1.462,1.462,0,0,1,.146-.08,1.758,1.758,0,0,1,.85-.171h2.529l-.02.143a2.376,2.376,0,0,0,.492,1.793,2.2,2.2,0,0,0,1.63.831,2.133,2.133,0,0,0,1.525-.494,2.316,2.316,0,0,0,.839-2.117l-.019-.144h2.62a1.851,1.851,0,0,1,.459.067,1.693,1.693,0,0,1,1.264,1.716v8a.858.858,0,0,0,0,.143v3.594a1.773,1.773,0,0,1,0,.207h.012A1.715,1.715,0,0,1,515.677,451.676Z"
        fill="#1d1d1b"
      />
      <path
        id="Path_44392"
        data-name="Path 44392"
        d="M514.139,442.57h-5.015a.531.531,0,1,0,0,1.062h5.015a.531.531,0,1,0,0-1.062Z"
        fill="#1d1d1b"
      />
      <path
        id="Path_44393"
        data-name="Path 44393"
        d="M505.3,444.248a.538.538,0,0,0,.753,0l1.539-1.542a.531.531,0,1,0-.751-.751l-1.165,1.165-.2-.2a.531.531,0,1,0-.751.752Z"
        fill="#1d1d1b"
      />
      <path
        id="Path_44394"
        data-name="Path 44394"
        d="M514.139,446.279h-5.015a.532.532,0,1,0,0,1.063h5.015a.532.532,0,1,0,0-1.063Z"
        fill="#1d1d1b"
      />
      <path
        id="Path_44395"
        data-name="Path 44395"
        d="M506.839,445.664l-1.166,1.165-.2-.2a.531.531,0,0,0-.751.752l.571.571a.531.531,0,0,0,.737.016l1.557-1.556a.531.531,0,1,0-.752-.751Z"
        fill="#1d1d1b"
      />
    </g>
  </svg>
);

const ClockIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M11.763 8.447c0 0 0 0 0 0-0.365 0-0.661 0.296-0.661 0.661v3.668c0 0.001-0 0.003-0 0.004 0 0.18 0.074 0.343 0.193 0.46l0 0 2.468 2.472c0.117 0.117 0.278 0.189 0.456 0.189 0.001 0 0.002 0 0.003 0h-0c0.185-0.002 0.353-0.076 0.476-0.196l-0 0c0.117-0.12 0.189-0.284 0.189-0.465s-0.072-0.345-0.189-0.465l0 0-2.271-2.275v-3.393c0 0 0 0 0 0 0-0.365-0.296-0.661-0.661-0.661-0.001 0-0.002 0-0.003 0h0z"></path>
    <path d="M21 11.994c-0.009-4.966-4.034-8.988-8.999-8.994h-0.006c-4.968 0.003-8.995 4.031-8.995 9 0 0.002 0 0.004 0 0.006v-0c0.003 4.968 4.031 8.995 9 8.995 2.488 0 4.739-1.009 6.368-2.64l0-0c1.626-1.619 2.632-3.859 2.632-6.334 0-0.011-0-0.022-0-0.033v0.002zM12 19.68v0c-4.204-0.047-7.595-3.466-7.595-7.677s3.39-7.63 7.59-7.677l0.004-0c4.205 0.047 7.595 3.466 7.595 7.677s-3.39 7.63-7.59 7.677l-0.004 0z"></path>
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16.369"
    height="18"
    viewBox="0 0 16.369 18"
  >
    <g
      id="Group_176975"
      data-name="Group 176975"
      transform="translate(-544.328 -1359.657)"
    >
      <path
        id="Path_80809"
        data-name="Path 80809"
        d="M560.08,1374.082c-1.282-1.3-2.591-2.576-3.893-3.857a.981.981,0,0,0-.374-.224c-.895-.278-1.8-.543-2.694-.813a.724.724,0,0,0-.773.162.707.707,0,0,0-.172.745c.259.91.508,1.823.773,2.731a.929.929,0,0,0,.227.386q1.93,1.922,3.869,3.832a2.013,2.013,0,0,0,1.3.606h.005a2.186,2.186,0,0,0,2.165-1.293A1.987,1.987,0,0,0,560.08,1374.082Zm-3.2.793c-.026-.024-.073-.065-.117-.109q-1.185-1.164-2.36-2.339a.644.644,0,0,1-.153-.264c-.124-.408-.235-.818-.361-1.263.467.139.9.267,1.333.4a.275.275,0,0,1,.1.068l2.56,2.512Zm2.353.808a.658.658,0,0,1-.505.531.741.741,0,0,1-.8-.3h0l.988-.978A.7.7,0,0,1,559.236,1375.683Z"
        fill="#06090f"
      />
      <path
        id="Path_80810"
        data-name="Path 80810"
        d="M551.033,1376.246v0c-1.252.016-2.5.006-3.753,0a1.433,1.433,0,0,1-1.526-1.33,1.347,1.347,0,0,1,0-.179v-10.417a1.426,1.426,0,0,1,1.354-1.495h0a1.4,1.4,0,0,1,.16,0h2.154a2.192,2.192,0,0,0,.466,1.677,2.1,2.1,0,0,0,1.55.781,2.062,2.062,0,0,0,1.452-.465,2.168,2.168,0,0,0,.794-1.984c.053,0,.082-.008.106-.008h2.116a1.606,1.606,0,0,1,.385.056,1.4,1.4,0,0,1,1.059,1.413v2.968a1.043,1.043,0,0,0,.028.295.714.714,0,0,0,.881.483.7.7,0,0,0,.516-.685v-3.093a3.286,3.286,0,0,0-.032-.433,2.824,2.824,0,0,0-2.778-2.407h-2.279v-1.065a.694.694,0,0,0-.691-.7h-2.888a.688.688,0,0,0-.692.666v1.088h-2.25a2.829,2.829,0,0,0-2.732,2.06c-.039.134-.073.269-.107.4v11.317c.031.124.055.248.093.37a2.8,2.8,0,0,0,2.318,2.062.421.421,0,0,1,.08.032H551.3c.007-.008.014-.021.022-.025a.7.7,0,0,0,.5-.808A.745.745,0,0,0,551.033,1376.246Zm-.189-15.177h1.4c0,.049.013.093.013.138v1.915a.7.7,0,0,1-.548.726.688.688,0,0,1-.841-.481.667.667,0,0,1-.022-.126C550.828,1362.519,550.844,1361.8,550.844,1361.069Z"
        fill="#06090f"
      />
    </g>
  </svg>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="19.28"
    viewBox="0 0 16 19.28"
  >
    <path
      id="Path_44786"
      data-name="Path 44786"
      d="M260.792,908.567V891.943A1.725,1.725,0,0,0,259,890.3H246.585a1.725,1.725,0,0,0-1.793,1.644v16.624a.99.99,0,0,0,.553.877,1.183,1.183,0,0,0,1.106,0l6.341-3.392,6.341,3.392a1.234,1.234,0,0,0,1.131-.022A.957.957,0,0,0,260.792,908.567Zm-1.517-.663-6.483-3.469-6.483,3.469V892.18a.5.5,0,0,1,.495-.49h11.9a.525.525,0,0,1,.574.49Z"
      transform="translate(-244.792 -890.299)"
    />
  </svg>
);

const AnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17.885"
    height="17.9"
    viewBox="0 0 17.885 17.9"
  >
    <g
      id="Group_43385"
      data-name="Group 43385"
      transform="translate(-671.972 -285.753)"
    >
      <path
        id="Path_44427"
        data-name="Path 44427"
        d="M685.463,297.163c-.006-.542-.006-1.087-.006-1.614v-1.324c0-.7,0-1.2.006-1.624a.833.833,0,0,0-.449-.794c-.875-.521-1.862-1.113-2.642-1.586-.6-.361-.9-.548-1.209-.734a.811.811,0,0,0-.934,0c-1.265.776-2.459,1.5-3.875,2.336a.785.785,0,0,0-.425.737c.008,1.566.008,3.121,0,4.625a.786.786,0,0,0,.421.742c1.592.949,2.8,1.675,3.9,2.352l.063.038a.856.856,0,0,0,.389.1.819.819,0,0,0,.433-.136h0c1.524-.926,2.725-1.65,3.9-2.349A.806.806,0,0,0,685.463,297.163Zm-5.431,1.424-.469-.282c-.88-.528-1.561-.939-2.205-1.332a.291.291,0,0,1-.078-.091l-.012-.044c-.008-.883-.008-1.748-.008-2.664v-.52l.185.1c.043.023.084.046.122.07l.463.278c.643.386,1.253.757,1.816,1.1a.432.432,0,0,1,.166.2l.008.034c.012.835.012,1.648.012,2.51Zm.755-4.492-.029.018h-.06a.341.341,0,0,1-.054-.005l-.011,0-.027-.009c-.763-.456-1.506-.9-2.293-1.378l-.438-.263.62-.355c.231-.133.446-.274.655-.411l.041-.026c.213-.14.477-.313.759-.473l.02-.012a1.789,1.789,0,0,1,.692-.285l.025-.005.05.01.8.386,1.345.808s.295.171.446.261l.181.106-1.408.848C681.659,293.573,681.226,293.833,680.787,294.1Zm3.345,1.1c0,.492,0,1-.006,1.5a.515.515,0,0,1-.068.243l-.034.037c-.622.386-1.23.753-1.875,1.14l-.239.145c-.115.075-.232.143-.361.218l-.19.109v-.56c0-.9,0-1.74.005-2.6a.265.265,0,0,1,.057-.141l.024-.023c.461-.284.915-.558,1.38-.838l1.307-.787Z"
        fill="#12181c"
      />
      <path
        id="Path_44428"
        data-name="Path 44428"
        d="M689.174,298.526a.685.685,0,0,0-.684.684v3.075h-3.065a.683.683,0,1,0,0,1.366h3.75a.683.683,0,0,0,.682-.683V299.21A.684.684,0,0,0,689.174,298.526Z"
        fill="#12181c"
      />
      <path
        id="Path_44429"
        data-name="Path 44429"
        d="M676.4,302.287h-3.064V299.21a.684.684,0,1,0-1.367,0v3.759a.685.685,0,0,0,.682.682l3.749,0a.683.683,0,1,0,0-1.366Z"
        fill="#12181c"
      />
      <path
        id="Path_44430"
        data-name="Path 44430"
        d="M672.655,290.881a.685.685,0,0,0,.684-.684v-3.074H676.4a.685.685,0,1,0,0-1.37h-3.747a.684.684,0,0,0-.486.2.674.674,0,0,0-.2.483V290.2A.684.684,0,0,0,672.655,290.881Z"
        fill="#12181c"
      />
      <path
        id="Path_44431"
        data-name="Path 44431"
        d="M689.659,285.955a.681.681,0,0,0-.484-.2h-3.75a.685.685,0,0,0,0,1.37h3.065V290.2a.684.684,0,1,0,1.367,0v-3.759A.673.673,0,0,0,689.659,285.955Z"
        fill="#12181c"
      />
    </g>
  </svg>
);

const CalendarIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <title>calender</title>
    <path d="M17.424 5.466h-0.261v-0.594c-0.015-0.379-0.325-0.68-0.706-0.68s-0.692 0.302-0.706 0.679l-0 0.001v0.594h-7.613v-0.594c0-0.39-0.316-0.707-0.707-0.707s-0.707 0.316-0.707 0.707v0 0.594h-0.148v0.012c-0.010-0-0.023-0-0.035-0-1.764 0-3.197 1.42-3.218 3.179l-0 0.002v7.994c0.020 1.762 1.453 3.182 3.218 3.182 0.012 0 0.025-0 0.037-0l-0.002 0h10.848c0.002 0 0.005 0 0.007 0 0.894 0 1.705-0.357 2.298-0.936l-0.001 0.001c0.586-0.572 0.949-1.37 0.949-2.252 0-0.001 0-0.003 0-0.004v0-7.995c-0.020-1.762-1.453-3.182-3.218-3.182-0.012 0-0.025 0-0.037 0l0.002-0zM19.273 16.655v0c-0.012 1.001-0.825 1.808-1.828 1.808-0.007 0-0.015-0-0.022-0l0.001 0h-10.851c-0.006 0-0.013 0-0.020 0-1.002 0-1.816-0.807-1.828-1.807l-0-0.001v-7.99c0.012-1.001 0.825-1.808 1.828-1.808 0.007 0 0.015 0 0.022 0l-0.001-0v-0.011h0.148v0.444c0.007 0.379 0.316 0.684 0.696 0.684 0.003 0 0.007-0 0.010-0h-0.001c0.001 0 0.003 0 0.004 0 0.19 0 0.363-0.074 0.491-0.196l-0 0c0.13-0.123 0.211-0.296 0.213-0.488v-0.444h7.61v0.444c0.007 0.379 0.316 0.684 0.696 0.684 0.003 0 0.007-0 0.010-0h-0.001c0.001 0 0.002 0 0.003 0 0.19 0 0.364-0.074 0.492-0.196l-0 0c0.129-0.123 0.21-0.296 0.212-0.488v-0.444h0.262c0.006-0 0.012-0 0.019-0 1.003 0 1.817 0.807 1.829 1.806l0 0.001z"></path>
    <path d="M7.435 7.98v0z"></path>
    <path d="M16.458 7.98v0z"></path>
    <path d="M8.581 10.268h-1.363c-0.002-0-0.005-0-0.008-0-0.383 0-0.694 0.309-0.698 0.691v0c0.005 0.382 0.317 0.69 0.7 0.69 0.003 0 0.006-0 0.008-0h1.36c0.193 0 0.368-0.076 0.497-0.201l-0 0c0.129-0.125 0.208-0.299 0.208-0.492 0-0.19-0.077-0.362-0.202-0.486l-0-0c-0.128-0.126-0.304-0.203-0.498-0.203-0.002 0-0.003 0-0.005 0h0z"></path>
    <path d="M8.581 14.391h-1.363c-0.002-0-0.005-0-0.007-0-0.383 0-0.695 0.309-0.699 0.691v0c0.005 0.382 0.316 0.689 0.699 0.689 0.003 0 0.006-0 0.009-0h1.36c0.002 0 0.005 0 0.007 0 0.19 0 0.362-0.074 0.489-0.196l-0 0c0.129-0.125 0.208-0.299 0.208-0.492 0-0.19-0.077-0.362-0.202-0.486l-0-0c-0.129-0.128-0.306-0.207-0.502-0.207-0 0-0 0-0 0h0z"></path>
    <path d="M12.732 10.268h-1.369c-0.002-0-0.005-0-0.008-0-0.383 0-0.694 0.309-0.698 0.691v0c0.005 0.382 0.317 0.69 0.7 0.69 0.003 0 0.006-0 0.008-0h1.366c0.193 0 0.368-0.076 0.497-0.201l-0 0c0.129-0.125 0.208-0.299 0.208-0.492 0-0.19-0.077-0.362-0.202-0.486l-0-0c-0.128-0.126-0.304-0.203-0.498-0.203-0.002 0-0.003 0-0.005 0h0z"></path>
    <path d="M12.732 14.391h-1.369c-0.002-0-0.005-0-0.007-0-0.383 0-0.695 0.309-0.699 0.691v0c0.005 0.382 0.316 0.689 0.699 0.689 0.003 0 0.006-0 0.009-0h1.366c0.002 0 0.005 0 0.007 0 0.19 0 0.362-0.074 0.489-0.196l-0 0c0.129-0.125 0.208-0.299 0.208-0.492 0-0.19-0.077-0.362-0.202-0.486l-0-0c-0.129-0.128-0.306-0.207-0.502-0.207-0 0-0 0-0 0v0z"></path>
    <path d="M16.779 10.268h-1.363c-0.002-0-0.005-0-0.007-0-0.383 0-0.695 0.309-0.699 0.691v0c0.005 0.382 0.317 0.69 0.7 0.69 0.003 0 0.006-0 0.008-0h1.36c0 0 0.001 0 0.001 0 0.193 0 0.368-0.076 0.496-0.201l-0 0c0.129-0.125 0.208-0.299 0.208-0.492 0-0.19-0.077-0.362-0.202-0.486l-0-0c-0.128-0.126-0.304-0.203-0.498-0.203-0.002 0-0.003 0-0.005 0h0z"></path>
    <path d="M16.779 14.391h-1.363c-0.002-0-0.004-0-0.006-0-0.383 0-0.695 0.308-0.7 0.691v0c0.005 0.382 0.316 0.689 0.699 0.689 0.003 0 0.006-0 0.009-0h1.36c0.002 0 0.005 0 0.008 0 0.19 0 0.362-0.074 0.489-0.196l-0 0c0.129-0.125 0.208-0.299 0.208-0.492 0-0.19-0.077-0.362-0.202-0.486l-0-0c-0.129-0.128-0.306-0.207-0.502-0.207-0 0-0 0-0 0h0z"></path>
  </svg>
);

const quick_menu_array = [
  {
    id: "Home",
    label: "Muamele",
    icon: HomeQuickIcon,
  },
  {
    id: "Transactions",
    label: "Münderecat",
    icon: RightAlignIcon,
  },
  {
    id: "Tasks",
    label: "Görevler",
    icon: TasksIcon,
  },
  {
    id: "Schedule",
    label: "Safahat",
    icon: ClockIcon,
  },
  {
    id: "Notes",
    label: "İmza Takibi",
    icon: ClipboardIcon,
  },
  {
    id: "Saved",
    label: "Künye Ayarları",
    icon: SaveIcon,
  },
  {
    id: "Analytics",
    label: "Safahat Analiz",
    icon: AnalyticsIcon,
  },
  {
    id: "Calendar",
    label: "Takvimler",
    icon: CalendarIcon,
  },
];

const QuickMenu = () => {
  const [quickTabSelected, setQuickTabSelected] =
    React.useState("Transactions");

  const handleChangeTab = React.useCallback((id) => {
    setQuickTabSelected(id);
  }, []);

  return (
    <div className={TableSectionStyles.quick_menu}>
      <ul className={TableSectionStyles.menu_list}>
        {quick_menu_array.map((_menu) => (
          <li
            key={_menu?.id}
            className={TableSectionStyles.menu_list_item}
            data-active={quickTabSelected == _menu?.id ? true : false}
            id={_menu?.id}
            onClick={() => handleChangeTab(_menu.id)}
          >
            <div className={TableSectionStyles.icon_container}>
              <_menu.icon />
            </div>
            <span>{_menu.label}</span>
          </li>
        ))}
      </ul>
      <div className={TableSectionStyles.bottom_icon_group}>
        <ul className={TableSectionStyles.menu_list}>
          <li className={TableSectionStyles.menu_list_item} id="Reports">
            <div className={TableSectionStyles.icon_container}>
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <title>reports</title>
                <path d="M20.623 6.591c-0.381-1.451-1.434-2.595-2.799-3.094l-0.031-0.010c-0.786-0.3-1.695-0.475-2.644-0.477h-0.001q-3.134-0.020-6.267 0c-0.815 0.009-1.597 0.137-2.334 0.367l0.058-0.015c-1.514 0.402-2.695 1.537-3.155 2.993l-0.009 0.032c-0.253 0.729-0.403 1.569-0.41 2.443l-0 0.003q-0.022 3.176 0 6.34c0.008 0.802 0.134 1.572 0.359 2.298l-0.015-0.057c0.362 1.367 1.321 2.457 2.573 2.991l0.029 0.011c0.846 0.354 1.828 0.563 2.859 0.571l0.003 0c1.050 0.025 2.095 0.006 3.153 0.006h2.453c0.069 0.002 0.151 0.003 0.233 0.003 0.923 0 1.817-0.12 2.669-0.344l-0.073 0.016c1.615-0.391 2.874-1.608 3.319-3.168l0.008-0.032c0.224-0.691 0.357-1.486 0.365-2.312l0-0.004c0.018-2.042 0.015-4.083 0.007-6.124-0.001-0.869-0.129-1.707-0.367-2.498l0.016 0.061zM19.714 15.142c-0.006 0.698-0.115 1.369-0.312 2.001l0.013-0.049c-0.321 1.171-1.236 2.071-2.394 2.363l-0.023 0.005c-0.658 0.182-1.413 0.286-2.193 0.286-0.060 0-0.12-0.001-0.18-0.002l0.009 0c-1.916 0-3.828 0-5.742-0.012-0.744-0.002-1.459-0.123-2.129-0.345l0.048 0.014c-1.166-0.366-2.044-1.323-2.291-2.511l-0.004-0.022c-0.155-0.608-0.244-1.306-0.244-2.024 0-0.019 0-0.038 0-0.057l-0 0.003v-2.788h0.007v0.006c0-1.045-0.009-2.086 0.006-3.128 0.006-0.685 0.108-1.343 0.292-1.966l-0.013 0.051c0.327-1.246 1.319-2.197 2.566-2.458l0.022-0.004c0.625-0.155 1.342-0.244 2.080-0.244 0.047 0 0.093 0 0.139 0.001l-0.007-0c1.916 0 3.829-0.015 5.742 0.020 0.661 0.022 1.29 0.115 1.894 0.273l-0.060-0.013c1.29 0.286 2.283 1.296 2.54 2.573l0.004 0.021c0.153 0.584 0.241 1.254 0.241 1.944 0 0.006 0 0.012-0 0.019v-0.001c-0.001 2.015 0.003 4.030-0.011 6.046z"></path>
                <path d="M16.059 9.303c-0.048-0.014-0.104-0.021-0.161-0.021-0.205 0-0.387 0.1-0.499 0.254l-0.001 0.002q-0.928 1.203-1.859 2.404c-0.166 0.214-0.236 0.222-0.449 0.053-0.472-0.371-0.941-0.749-1.417-1.116-0.017-0.015-0.035-0.029-0.053-0.043-0.24-0.185-0.545-0.297-0.877-0.297-0.466 0-0.881 0.221-1.145 0.564l-0.002 0.003q-1.012 1.285-1.996 2.594c-0.080 0.12-0.127 0.267-0.127 0.425 0 0.011 0 0.021 0.001 0.031l-0-0.001c0.032 0.311 0.293 0.552 0.61 0.552 0.203 0 0.383-0.099 0.495-0.251l0.001-0.002 1.911-2.488c0.178-0.231 0.243-0.24 0.478-0.058q0.687 0.537 1.369 1.081c0.243 0.212 0.561 0.344 0.909 0.352l0.002 0c0.027 0.002 0.059 0.003 0.091 0.003 0.439 0 0.832-0.203 1.088-0.52l0.002-0.003q0.998-1.256 1.964-2.545c0.074-0.116 0.118-0.257 0.118-0.408 0-0.017-0.001-0.033-0.002-0.049l0 0.002c-0.021-0.255-0.204-0.463-0.446-0.519l-0.004-0.001z"></path>
              </svg>
            </div>
            <span>İşlem Kayıtları</span>
          </li>
          <li className={TableSectionStyles.menu_list_item}>
            <div className={TableSectionStyles.icon_container}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14.939"
                height="2.788"
                viewBox="0 0 14.939 2.788"
              >
                <g
                  id="Group_28537"
                  data-name="Group 28537"
                  transform="translate(431.361 642.3) rotate(180)"
                >
                  <circle
                    id="Ellipse_172"
                    data-name="Ellipse 172"
                    cx="1.394"
                    cy="1.394"
                    r="1.394"
                    transform="translate(428.573 639.512)"
                    fill="#1d1d1b"
                  />
                  <circle
                    id="Ellipse_173"
                    data-name="Ellipse 173"
                    cx="1.394"
                    cy="1.394"
                    r="1.394"
                    transform="translate(422.497 639.512)"
                    fill="#1d1d1b"
                  />
                  <circle
                    id="Ellipse_174"
                    data-name="Ellipse 174"
                    cx="1.394"
                    cy="1.394"
                    r="1.394"
                    transform="translate(416.422 639.512)"
                    fill="#1d1d1b"
                  />
                </g>
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableSection;
