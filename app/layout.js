import "./globals.css";

export const metadata = {
  title: "Manifiesto | Registro y Control de Productos",
  description: "Sistema de registro y control de productos en stock",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
