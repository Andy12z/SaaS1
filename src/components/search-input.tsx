"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
export default function SearchInput() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === "/companions") {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["topic"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className="relative border border-black items-center flex rounded-lg gap-2 px-2 py-1 h-fit">
      <Image 
       src="/icons/search.svg"
       alt="Search" 
       width={15}
       height={15} />
      <Input
        placeholder="search companions...."
        className="outline-none"
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
}
