import { MealizeDeliveryDetail } from "@/components/mealize/mealize-delivery-detail";

export default async function DeliveryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deliveryId = Number.parseInt(id, 10);
  if (Number.isNaN(deliveryId)) {
    return <p className="p-6 text-sm text-red-600">Invalid delivery id.</p>;
  }
  return <MealizeDeliveryDetail deliveryId={deliveryId} />;
}
