const SearchBar = ({
    search,
    setSearch
}) => {
    return (
        <div className="mb-8">
            <input
              type="text"
              placeholder="Search Courses..."
              value={search}

              onChange={(e) => {
                setSearch(e.target.value)
              }}
              className="w-full bg-white p-4 rounded-xl shadow outline-none"
            />
        </div>
    )
}

export default SearchBar