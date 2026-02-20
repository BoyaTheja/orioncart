async function getProduct(id: string) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <p className="text-xl mt-4">₹ {product.price}</p>

      <p className="mt-2">{product.description}</p>
    </div>
  );
}
