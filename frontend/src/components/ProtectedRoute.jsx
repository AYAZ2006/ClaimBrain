import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

export default function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gray-50"><SignIn routing="hash" /></div>
      </SignedOut>
    </>
  );
}