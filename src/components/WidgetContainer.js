export default function WidgetContainer({ children }) {
  return (
    <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
      {children}
    </div>
  );
}
