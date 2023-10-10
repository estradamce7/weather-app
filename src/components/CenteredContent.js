export default function CenteredContent({ children }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 space-y-6">
      {children}
    </main>
  );
}
