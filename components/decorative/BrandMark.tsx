import Image from "next/image";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={className}
      height={24}
      src="/assets/icon-mortar.svg"
      width={24}
    />
  );
}
