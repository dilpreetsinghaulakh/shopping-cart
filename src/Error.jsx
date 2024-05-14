export default function ErrorPage(error) {
  return (
    <div className="h-[90vh] w-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="text-5xl font-black">
        Opps there is an <em className="text-red-500">error</em>
      </h1>
      <p className="font-mono text-neutral-700">Error Code: {error.message}</p>
    </div>
  );
}
