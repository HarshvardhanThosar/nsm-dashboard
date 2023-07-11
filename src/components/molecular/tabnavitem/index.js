"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// S T Y L E S
import TabNavigationItemStyles from "./styles.module.scss";

function TabNavigationItem({ label, href, icon, isActive, ...props }) {
  return (
    <Link href={href} title={label}>
      <div
        className={TabNavigationItemStyles.tab_nav_item}
        id={TabNavigationItemStyles[props?.id]}
        data-active={isActive ? true : false}
        onClick={props.onClick}
      >
        <div className={TabNavigationItemStyles.icon_container}>
          <Image alt={label} title={label} src={icon} />
        </div>
        <span className={TabNavigationItemStyles.label_container}>{label}</span>
      </div>
    </Link>
  );
}

export default TabNavigationItem;
