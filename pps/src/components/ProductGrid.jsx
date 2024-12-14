import { Button } from './ui/button';

const ProductGrid = ({ products, loading }) => (
  <div className="container mx-auto p-4">
    {loading ? (
      <div className="text-center text-gray-500 text-lg">Loading products...</div>
    ) : products.length === 0 ? (
      <div className="text-center text-gray-500 text-lg">Produk Tidak Ditemukan</div>
    ) : (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg border bg-white p-4 shadow-sm">
            <img
              src={product.image || "https://blog.delivery365.app/wp-content/uploads/2023/03/food-delivery-packaging-bags.jpg"}
              alt={product.package_name}
              className="mb-4 h-[200px] w-full rounded-lg object-cover"
            />
            <h3 className="text-lg font-semibold">{product.package_name}</h3>
            <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
              {product.category_name || "Unknown Category"}
            </span>
            <p className="mt-2 text-sm text-gray-600">
              {product.description || "No description available"}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm ${product.stock === 0 ? "text-red-500" : "text-gray-500"}`}
              >
                {product.stock === 0 ? "Stock Habis" : `Stock: ${product.stock}`}
              </span>
              <span className="text-lg font-bold text-blue-600">
                ${product.price || "N/A"}
              </span>
            </div>
            <Button
              className={`mt-4 w-full text-xs text-white ${product.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default ProductGrid;
