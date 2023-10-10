export default function WidgetContainer({ children }) {
  return (
    <div className="w-full max-w-screen-md bg-white p-10 msm:px-5 msm:py-4 rounded-xl ring-8 ring-white ring-opacity-40">
      {children}
    </div>
  );
}
