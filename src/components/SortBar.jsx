const SortBar = ({
    sortBy,
    setSortBy
}) => {
    return (
        <div className="mb-8">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
              }}
              className="bg-white p-3 rounded-xl shadow outline-none">
                <option value="default">
                    Sort By
                </option>
                <option value ="high">
                    Highest Progress
                </option>
                <option value="low">
                    Lowest Progress
                </option>
              </select>
        </div>
    )
}

export default SortBar