const Pagination = ({
    currentPage,
    totalPages,
    setCurrentPage
}) => {

    return (

        <div className="flex gap-3 justify-center mt-10 flex-wrap">

            <button
                disabled={currentPage === 1}
                onClick={() => {
                    setCurrentPage(currentPage - 1)
                }}
                className="bg-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
                Prev
            </button>

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                {currentPage}
            </button>

            <button
                disabled={currentPage === totalPages}
                onClick={() => {
                    setCurrentPage(currentPage + 1)
                }}
                className="bg-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
                Next
            </button>

        </div>
    )
}

export default Pagination