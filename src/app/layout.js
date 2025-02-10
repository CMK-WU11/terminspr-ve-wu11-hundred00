import "./globals.css";

export const metadata = {
  title: {
    default: "Landrup Dans",
    template: "%s | Landrup Dans",
  },
  description: "Med vores forskellige dansestilarter og niveauer tilbyder vi et bredt udvalg af danseundervisning i Landrup og omegn, der passer til enhver smag og erfaring.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body className="bg-mainBackground text-mainWhite antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
