import "./globals.css";

export const metadata = {
  title: "EDA",
  description: "Interactive exploratory data analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
