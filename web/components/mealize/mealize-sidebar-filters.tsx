"use client";

import type { ReactNode } from "react";

import {
  type FeedFilter,
  useMealizeFilter,
  useMealizeTheme,
} from "@/stores/mealize-ui-store";

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: ReactNode;
}) {
  const { theme } = useMealizeTheme();
  return (
    <fieldset
      className="flex w-[120px] flex-col gap-2 rounded-[5px] p-2.5 text-base"
      style={{
        border:
          theme === "light"
            ? "1px solid rgba(0, 0, 0, 0.2)"
            : "1px solid #616161",
        backgroundColor: theme === "light" ? "white" : "#191919",
      }}
    >
      <legend
        className="flex h-5 w-[100px] items-center justify-center rounded-[3px] border border-[rgba(40,166,144,0.5)] px-1 text-center text-sm font-medium text-black"
        style={{
          backgroundColor: theme === "light" ? "#9AF2C0" : "#76D97E",
        }}
      >
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Row({
  label,
  onSelect,
  active,
}: {
  label: string;
  onSelect: () => void;
  active: boolean;
}) {
  const { theme } = useMealizeTheme();
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-[125px] cursor-pointer flex-row items-center gap-2.5 border-0 bg-transparent p-0 text-left"
    >
      <span
        className={`text-xs font-bold hover:underline ${active ? "underline" : ""}`}
        style={{ color: theme === "light" ? "#191919" : "white" }}
      >
        {label}
      </span>
    </button>
  );
}

export function MealizeSidebarFilters() {
  const { theme } = useMealizeTheme();
  const { filter, setFilter } = useMealizeFilter();

  return (
    <div className="flex w-[150px] shrink-0 flex-col gap-6 pt-2.5">
      <h2
        className="-mb-1 text-base font-extrabold"
        style={{ color: theme === "light" ? "#191919" : "white" }}
      >
        Filters
      </h2>

      <Fieldset legend="Favorites">
        <Row
          label="My favorites"
          active={filter === "favorites"}
          onSelect={() => setFilter("favorites")}
        />
      </Fieldset>

      <Fieldset legend="Availability">
        <Row
          label="Available"
          active={filter === "available"}
          onSelect={() => setFilter("available")}
        />
        <Row
          label="Unavailable"
          active={filter === "unavailable"}
          onSelect={() => setFilter("unavailable")}
        />
      </Fieldset>

      <Fieldset legend="Post type">
        <Row
          label="Requests"
          active={filter === "requests"}
          onSelect={() => setFilter("requests")}
        />
        <Row
          label="Items"
          active={filter === "items"}
          onSelect={() => setFilter("items")}
        />
      </Fieldset>

      <Fieldset legend="Categories">
        {(
          [
            ["dairy", "Dairy"],
            ["vegetables", "Vegetables"],
            ["fruits", "Fruits"],
            ["grains", "Grains"],
            ["protein", "Protein"],
          ] as const
        ).map(([key, label]) => (
          <Row
            key={key}
            label={label}
            active={filter === key}
            onSelect={() => setFilter(key as FeedFilter)}
          />
        ))}
      </Fieldset>
    </div>
  );
}
