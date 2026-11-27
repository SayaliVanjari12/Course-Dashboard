import { useState, useEffect } from "react"

import { mockCourses } from "./data/mockCourses"

import CourseCard from "./components/CourseCard"
import SearchBar from "./components/SearchBar"
import FilterBar from "./components/FilterBar"
import SortBar from "./components/SortBar"
import Pagination from "./components/pagination"

const App = () => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState("default")
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      try {
        const storedFavorites =
          localStorage.getItem("favorites")
        if (
          storedFavorites &&
          storedFavorites !== "undefined"
        ) {
          setFavorites(
            JSON.parse(storedFavorites)
          )
        }
        setLoading(false)
      }
      catch (err) {
        console.log(err)
        setError(true)
        setLoading(false)
      }
    }, 1500)
  }, [])

  const toggleFavorite = (courseId) => {
    let updatedFavorites
    if (favorites.includes(courseId)) {
      updatedFavorites = favorites.filter((id) => {
        return id !== courseId
      })
    }
    else {
      updatedFavorites = [
        ...favorites,
        courseId
      ]
    }
    setFavorites(updatedFavorites)
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    )
  }

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )

    const matchesCategory =
      category === "All"
        ? true
        : course.category === category

    const matchesFavorites =
      activeTab === "favorites"
        ? favorites.includes(course.id)
        : true

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFavorites
    )
  })

  if (sortBy === "high") {
    filteredCourses.sort((a, b) => {
      return b.progress - a.progress
    })
  }
  else if (sortBy === "low") {
    filteredCourses.sort((a, b) => {
      return a.progress - b.progress
    })
  }

  const coursesPerPage = 6
  const totalPages = Math.ceil(
    filteredCourses.length / coursesPerPage
  )
  const startIndex = (currentPage - 1) * coursesPerPage
  const endIndex = startIndex + coursesPerPage
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    endIndex
  )
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold text-red-500">
        Something went wrong
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">
        Course Dashboard
      </h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => {
            setActiveTab("all")
          }}
          className={`px-5 py-2 rounded-xl
            ${activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
            }`}>
          All courses
        </button>
        <button
          onClick={() => {
            setActiveTab("favorites")
          }}
          className={`px-5 py-2 rounded-xl

      ${activeTab === "favorites"

              ? "bg-red-500 text-white"

              : "bg-white text-black"

            }`}>
          Favorites
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}>
      </SearchBar>

      <FilterBar
        category={category}
        setCategory={setCategory}
      />

      <SortBar
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((course) => {
            return (
              <CourseCard
                key={course.id}
                course={course}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            )
          })
        ) : (
          <h1 className="text-2xl font-bold text-gray-500">
            No Courses Found
          </h1>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default App