import { MealizeDeliveryDetail } from "@/components/mealize/mealize-delivery-detail";

export default async function DeliveryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deliveryId = Number.parseInt(id, 10);
  if (Number.isNaN(deliveryId)) {
    return (
      <div className="mx-auto max-w-lg px-6 py-12">
        <p className="text-sm font-semibold text-destructive">Invalid delivery id.</p>
      </div>
    );
  }
  return <MealizeDeliveryDetail deliveryId={deliveryId} />;
}
