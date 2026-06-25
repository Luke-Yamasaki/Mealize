"use client";

import { ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { type FeedFilter, useMealizeFilter } from "@/stores/mealize-ui-store";

const FILTER_LABEL: Record<FeedFilter, string> = {
  available: "Available",
  unavailable: "Unavailable",
  favorites: "My favorites",
  items: "Items",
  requests: "Requests",
  dairy: "Dairy",
  vegetables: "Vegetables",
  fruits: "Fruits",
  grains: "Grains",
  protein: "Protein",
};

export function MealizeFilterDropdown({ align = "end" }: { align?: "start" | "end" }) {
  const { filter, setFilter } = useMealizeFilter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "h-9 min-w-[10.5rem] shrink-0 justify-between gap-2 font-semibold",
        )}
      >
        <span className="truncate">{FILTER_LABEL[filter]}</span>
        <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="min-w-[13rem]">
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={(v) => {
            if (v) setFilter(v as FeedFilter);
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>Favorites</DropdownMenuLabel>
            <DropdownMenuRadioItem value="favorites">My favorites</DropdownMenuRadioItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Availability</DropdownMenuLabel>
            <DropdownMenuRadioItem value="available">Available</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="unavailable">Unavailable</DropdownMenuRadioItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Post type</DropdownMenuLabel>
            <DropdownMenuRadioItem value="requests">Requests</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="items">Items</DropdownMenuRadioItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel>Categories</DropdownMenuLabel>
            <DropdownMenuRadioItem value="dairy">Dairy</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="vegetables">Vegetables</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="fruits">Fruits</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="grains">Grains</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="protein">Protein</DropdownMenuRadioItem>
          </DropdownMenuGroup>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
