import "./global.css";

export const metadata = {
  title: "Todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center min-h-screen m-0 p-20 bg-white">
        {children}
      </body>
    </html>
  );
}

// body {
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   margin: 0;
//   background-color: #f5f5f5;
//   padding: 20px;
// }
