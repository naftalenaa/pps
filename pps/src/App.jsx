import { Search, ShoppingCart } from 'lucide-react';
import { Button } from './components/ui/button'; // Pastikan jalur benar
import logoMealkit from './assets/logo-mealkit.png';
import light from './assets/light.png';
import banner from './assets/banner.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { api } from './components/Api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ProductPage() {
  const [products, setProducts] = useState([]); // State untuk produk
  const [loading, setLoading] = useState(true); // State untuk loading
  const [searchQuery, setSearchQuery] = useState(''); // State untuk pencarian
  const [sortOption, setSortOption] = useState({ field: null, order: null });
  const [categories, setCategories] = useState([]); // State untuk kategori
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Fetch data produk saat komponen di-mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Mulai loading
        const data = await api.getProducts({
          keyword: searchQuery, // Search keyword
          category_id: selectedCategory,
          min_price: null,
          max_price: null,
          sort_by: sortOption.field,
          order: sortOption.order,
        });
        setProducts(data.data); // Asumsikan API memiliki field data
      } catch (err) {
        console.error('Failed to fetch products', err); // Handle error
      } finally {
        setLoading(false); // Selesai loading
      }

    };

    fetchProducts();
  }, [searchQuery, sortOption, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data.data); // Asumsikan API mengembalikan field `data`
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
      {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
          window.removeEventListener("online", handleOnline);
          window.removeEventListener("offline", handleOffline)
        };

        fetchCategories();
      }}}, []); // [] berarti hanya dijalankan sekali saat komponen di-mount



  return (

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Dialog open={isOffline}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No Internet Connection</DialogTitle>
            <DialogDescription>
              It seems you are offline. Please check your internet connection and try again.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </DialogContent>
      </Dialog>

      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between p-1
  ">
          <img src={logoMealkit} alt="Mealkit Logo" className="h-11 w-auto" />
          <div className="flex items-center gap-4 p-2">
            <Button variant="ghost" size="lg" className="gap-3">
              <ShoppingCart className="  !h-5 !w-5 text-blue-700" />
              <p className='text-m text-blue-700'>Cart</p>
            </Button>
            <img src={light} alt="profile" className="h-11 w-11 rounded-full" />
          </div>
        </div>
      </header>
      {/* Banner */}
      <div className="relative h-[500px] bg-[#E8F3F3]">
        <img
          src={banner}
          alt="Fresh vegetables"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              className="w-full rounded-lg border px-4 py-2 pl-10 md:w-[300px]"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                // Jika kategori baru dipilih, set kategori tersebut
                setSelectedCategory(value);
                console.log(`Selected category: ${value}`);

              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={null}>All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.category_id} value={category.category_id} onClick={() => {
                    if (category.category_id === selectedCategory) {
                      setSelectedCategory(null);
                    }
                  }}>
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>



            <Select
              onValueChange={(value) => {
                if (value === 'package_name_asc') {
                  setSortOption({ field: 'package_name', order: 'asc' });
                } else if (value === 'package_name_desc') {
                  setSortOption({ field: 'package_name', order: 'desc' });
                } else if (value === 'price_asc') {
                  setSortOption({ field: 'price', order: 'asc' });
                } else if (value === 'price_desc') {
                  setSortOption({ field: 'price', order: 'desc' });
                } else if (value === 'stock') {
                  setSortOption({ field: 'stock', order: 'desc' });
                } else {
                  setSortOption({ field: null, order: null }); // Reset jika tidak ada sorting
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="package_name_asc">Sort by Name (A-Z)</SelectItem>
                <SelectItem value="package_name_desc">Sort by Name (Z-A)</SelectItem>
                <SelectItem value="price_asc">Lower Price</SelectItem>
                <SelectItem value="price_desc">Higest Price</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto p-4">
        {products.length == 0 && (
          <div className="text-center text-gray-500">Product Tidak Ditemukan
          </div>
        )

        }
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-lg border bg-white p-4 shadow-sm">
                <img
                  src={product.image || "https://blog.delivery365.app/wp-content/uploads/2023/03/food-delivery-packaging-bags.jpg"} // Default image
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
                  <span className="text-sm text-gray-500">Stock: {product.stock || 0}</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price || "N/A"}
                  </span>
                </div>
                <Button className="mt-4 w-full bg-blue-500 text-xs text-white">
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
