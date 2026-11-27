const FilterBar = ({
    category,
    setCategory
}) => {
    const categories = [
        "All",
        "Frontend",
        "Backend",
        "Design"
    ]
    return (
        <div className="flex gap-4 mb-8 flex-wrap">
            {categories.map((cat) => {
                return (
                    <button
                        key={cat}
                        onClick={() => {
                            setCategory(cat)
                        }}
                        className={`px-4 py-2 rounded-full font-medium

              ${category === cat

                                ? "bg-blue-500 text-white"

                                : "bg-white text-black"

                            }`}>
                                {cat}
                            </button>
                )
            })}
        </div>
    )
}
export default FilterBar
