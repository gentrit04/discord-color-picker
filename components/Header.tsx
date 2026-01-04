import Image from "next/image";

function Header() {
  return (
    <header className="border-border w-full border-b py-4 sm:p-4">
      <div className="flex items-center justify-center gap-4 sm:justify-start">
        <Image
          width={48}
          height={48}
          src="hah.jpg"
          alt="logo"
          className="rounded-full hover:animate-spin"
          unoptimized
        />
        <span className="text-foreground text-xl">Discord Color Picker</span>
      </div>
    </header>
  );
}

export default Header;
