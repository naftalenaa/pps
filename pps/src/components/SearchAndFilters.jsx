import { Search } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

const SearchAndFilter = ({ searchQuery, setSearchQuery, categories, setSelectedCategory, setSortOption }) => (
  <div className="container mx-auto p-4">
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative">
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 pl-10 md:w-[300px]"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
      <div className="flex gap-2">
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.category_id} value={category.category_id}>
                {category.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            const sortOptions = {
              package_name_asc: { field: 'package_name', order: 'asc' },
              package_name_desc: { field: 'package_name', order: 'desc' },
              price_asc: { field: 'price', order: 'asc' },
              price_desc: { field: 'price', order: 'desc' },
            };
            setSortOption(sortOptions[value] || { field: null, order: null });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="package_name_asc">Sort by Name (A-Z)</SelectItem>
            <SelectItem value="package_name_desc">Sort by Name (Z-A)</SelectItem>
            <SelectItem value="price_asc">Lower Price</SelectItem>
            <SelectItem value="price_desc">Highest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

export default SearchAndFilter;
