import SearchBar from "@/components/SearchBar";

export default function ListPageLayout() {
  return (
    <div className="flex-1 p-4 lg:p-12 flex">
      <div className="flex-1 grid grid-rows-12">
        <div className="row-span-2 items-center grid grid-cols-1 lg:grid-cols-2 justify-items-center">
          <SearchBar />
        </div>

        <div className="row-span-11 lg:row-span-10 bg-amber-100"></div>
      </div>
    </div>
  );
}
