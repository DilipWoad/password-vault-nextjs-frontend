import "./globals.css";
import { EncryptionContextProvider } from "./utils/ContextApi/EncryptionContext.js";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <EncryptionContextProvider>{children}</EncryptionContextProvider>
      </body>
    </html>
  );
}
