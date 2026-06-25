import { MealizeOrganizationDetail } from "@/components/mealize/mealize-organization-detail";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const organizationId = Number.parseInt(id, 10);
  if (Number.isNaN(organizationId)) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12">
        <p className="text-sm font-semibold text-destructive">Invalid organization id.</p>
      </div>
    );
  }
  return <MealizeOrganizationDetail organizationId={organizationId} />;
}
