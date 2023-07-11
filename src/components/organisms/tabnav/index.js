"use client";

import React from "react";
import Image from "next/image";

// S T Y L E S
import TabNavigationStyles from "./styles.module.scss";

// A S S E T S
import Amblem from "@/assets/icons/amblem.svg";
import Analitik from "@/assets/icons/rectangle-vertical-bars.svg";
import Muamele from "@/assets/icons/file-lines.svg";
import Aşama from "@/assets/icons/folder-3.svg";
import Eposta from "@/assets/icons/envelope.svg";
import Doküman from "@/assets/icons/file.svg";
import Ayarlar from "@/assets/icons/sliders.svg";
import Takvim from "@/assets/icons/calender-days-2.svg";
import Avatar from "@/assets/icons/avatar.svg";

// C O M P O N E N T S
import TabNavigationItem from "@/components/molecular/tabnavitem";
import Link from "next/link";

const navitems_array = [
  {
    label: "Analitik",
    icon: Analitik,
    href: "/analitik",
  },
  {
    label: "Muamele",
    icon: Muamele,
    href: "/",
  },
  {
    label: "Aşama",
    icon: Aşama,
    href: "/aşama",
  },
  {
    label: "E-posta",
    icon: Eposta,
    href: "/e-posta",
  },
  {
    label: "Doküman",
    icon: Doküman,
    href: "/doküman",
  },
  {
    label: "Ayarlar",
    icon: Ayarlar,
    href: "/ayarlar",
  },
  {
    label: "Takvim",
    icon: Takvim,
    href: "/takvim",
  },
];

function TabNavigation() {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);

  const toggleModal = () => setShowModal((current) => !current);

  const onTabOnClick = (item, index) => {
    setSelectedTabIndex(index);
  };

  return (
    <nav id="tab_nav" className={TabNavigationStyles.tab_nav}>
      <TabNavigationItem href="/" label="NSM" icon={Amblem} id="logo" />
      <ul id="nav_list" className={TabNavigationStyles.nav_list}>
        {navitems_array.map(({ label, icon, href }, index) => (
          <li key={index ?? Math.random()}>
            <TabNavigationItem
              isActive={selectedTabIndex === index}
              {...{ label, icon, href }}
              onClick={(e) => {
                e.preventDefault();
                onTabOnClick({ label, icon, href }, index);
              }}
            />
          </li>
        ))}
      </ul>
      <div className={TabNavigationStyles.avatar_container}>
        <div className={TabNavigationStyles.icon_container}>
          <Image alt="User" src={Avatar} title="Home" onClick={toggleModal} />
        </div>
        {showModal ? (
          <dialog open={true} className={TabNavigationStyles.modal_container}>
            <h2>Developed by Harshvardhan Thosar</h2>
            <div>
              <h3>Links</h3>
              <ul>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/harshvardhanthosar/"
                  >
                    - LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://github.com/HarshvardhanThosar/nsm-dashboard"
                  >
                    - Source Code
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://nsm-dashboard-4p4k.vercel.app/"
                  >
                    - Live Link
                  </Link>
                </li>
              </ul>
            </div>
          </dialog>
        ) : null}
      </div>
    </nav>
  );
}

export default TabNavigation;
