import "./globals.css";
export const metadata = {
  title: "Professor Mario Leite"
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
