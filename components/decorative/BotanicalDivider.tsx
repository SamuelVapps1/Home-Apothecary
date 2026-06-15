import Image from "next/image";

export function BotanicalDivider({ className = "" }: { className?: string }) {
  return (
    <Image
      aria-hidden="true"
      className={className}
      alt=""
      height={28}
      src="/assets/botanical-divider.svg"
      width={360}
    />
  );
}
