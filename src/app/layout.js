"use client";
import "@/styles/global.scss";

export const metadata = {
  title: "NSM Transactions Dashboard",
  description: "Developed by Harshvardhan Thosar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="portal"></div>
      </body>
    </html>
  );
}
