import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div
        className="fixed h-screen w-screen left-0 top-0 z-0 bg-cover bg-center bg-no-repeat filter blur-md opacity-50"
        style={{
          backgroundImage:
            "url('https://unsplash.com/photos/M9YvY6SBKBk/download')",
        }}
      ></div>
      <h1 className="text-4xl font-bold z-10">Welcome to the Shopping Cart</h1>
    </div>
  );
}
