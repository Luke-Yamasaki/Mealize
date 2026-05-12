import { MealizeOrganizationDetail } from "@/components/mealize/mealize-organization-detail";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const organizationId = Number.parseInt(id, 10);
  if (Number.isNaN(organizationId)) {
    return <p className="p-6 text-sm text-red-600">Invalid organization id.</p>;
  }
  return <MealizeOrganizationDetail organizationId={organizationId} />;
}
