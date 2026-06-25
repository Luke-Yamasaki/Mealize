"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { trpc } from "@/lib/trpc/react";

import { MealizeImageUploadField } from "./mealize-image-upload-field";

export function MealizeOnboardingForm() {
  const router = useRouter();
  const orgs = trpc.organization.batched.useQuery();
  const ensure = trpc.user.ensureProfile.useMutation({
    onSuccess: () => {
      void router.push("/");
      void router.refresh();
    },
  });

  const [organizationId, setOrganizationId] = useState<number>(1);
  const [isNonprofit, setIsNonprofit] = useState(false);
  const [isManager, setIsManager] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("1990-01-01");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const orgOptions = [
    ...(orgs.data?.businesses ?? []).map((o) => ({ ...o, kind: "Business" as const })),
    ...(orgs.data?.nonprofits ?? []).map((o) => ({ ...o, kind: "Nonprofit" as const })),
  ].sort((a, b) => a.id - b.id);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = profileImageUrl.trim();
    if (!url) return;
    ensure.mutate({
      organizationId,
      isNonprofit,
      isManager,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dob: new Date(dob),
      profileImageUrl: url,
    });
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h1 className="mb-2 text-2xl font-black text-zinc-900">Finish your Mealize profile</h1>
      <p className="mb-6 text-sm font-semibold text-zinc-600">
        Clerk handles sign-in; we store your org and contact details in the database (legacy parity with the old
        signup form).
      </p>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Organization
          <select
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={organizationId}
            onChange={(e) => {
              const id = Number(e.target.value);
              setOrganizationId(id);
              const o = orgOptions.find((x) => x.id === id);
              if (o) setIsNonprofit(o.isNonprofit);
            }}
            disabled={!orgs.data}
          >
            {orgOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} ({o.kind})
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-800">
          <input type="checkbox" checked={isNonprofit} onChange={(e) => setIsNonprofit(e.target.checked)} />
          Nonprofit user
        </label>
        <label className="flex items-center gap-2 text-sm font-bold text-zinc-800">
          <input type="checkbox" checked={isManager} onChange={(e) => setIsManager(e.target.checked)} />
          Manager (can create posts)
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          First name
          <input
            required
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Last name
          <input
            required
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Email
          <input
            required
            type="email"
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Phone
          <input
            required
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="3035550100"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold text-zinc-800">
          Date of birth
          <input
            required
            type="date"
            className="rounded border border-zinc-300 px-2 py-2 font-semibold"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <MealizeImageUploadField
          label="Profile photo"
          required
          value={profileImageUrl}
          onChange={setProfileImageUrl}
          helperText="Shown on your profile and in messages. PNG, JPEG, or WebP."
        />
        {ensure.error ? (
          <p className="text-sm font-semibold text-red-600">{ensure.error.message}</p>
        ) : null}
        <button
          type="submit"
          disabled={ensure.isPending || orgs.isLoading || !profileImageUrl.trim()}
          className="rounded-lg bg-[#28a690] px-4 py-3 text-sm font-extrabold text-white disabled:opacity-50"
        >
          {ensure.isPending ? "Saving…" : "Save and continue"}
        </button>
      </form>
    </div>
  );
}
