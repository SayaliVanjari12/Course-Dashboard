const CourseCard = ({
    course,
    favorites,
    toggleFavorite
}) => {
    const isFavorite = favorites.includes(course.id)
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                />
                <button
                    onClick={() => {
                        toggleFavorite(course.id)
                    }}
                    className="absolute top-3 right-3 bg-white h-10 w-10 rounded-full shadow">
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="p-5">
                <p className="text-sm text-blue-500 font-semibold">
                    {course.category}
                </p>
                <h2 className="text-2xl font-bold mt-2">
                    {course.title}
                </h2>
                <p className="mt-3 text-gray-600">
                    Progress: {course.progress}%
                </p>
            </div>
        </div>
    )
}

export default CourseCard