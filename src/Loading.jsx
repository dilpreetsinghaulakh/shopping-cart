export default function LoadingPage() {
  return (
    <div className="h-[90vh] w-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-5xl font-black flex gap-2">
        Loading
        <em className="text-amber-500 flex">
          <p className="animate-pulse">.</p>
          <p className="animate-pulse" style={{animationDelay: "250ms"}}>.</p>
          <p className="animate-pulse" style={{animationDelay: "500ms"}}>.</p>
        </em>
      </h1>
    </div>
  );
}
