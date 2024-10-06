"use client";

import { SessionProvider } from "next-auth/react";

// export default function SessionWrapper({ children, session }) {
//   console.log("Session passed to SessionProvider:", session);
//   return (
//     <SessionProvider session={session}>
//       {children}
//     </SessionProvider>
//   );
// }
export default function SessionWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}



// export default function SessionWrapper(props) {
//   return <SessionProvider>{props.children}</SessionProvider>;
// }