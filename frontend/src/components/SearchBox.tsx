export default function SearchBox() {
  return (
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl shadow-gray-900/10 dark:shadow-black/30 ring-1 ring-gray-100 dark:ring-gray-800">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 pointer-events-none"></div>

        <div className="relative px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FROM Field */}
            <div className="group flex flex-col gap-2">
              <label
                htmlFor="from"
                className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider pl-1"
              >
                From
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <select
                  id="from"
                  name="from"
                  className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 pl-12 pr-10 py-3.5 text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 cursor-pointer"
                >
                  <option value="mongolia">Mongolia</option>
                  <option value="china">China</option>
                  <option value="us">United States</option>
                  <option value="japan">Japan</option>
                  <option value="korea">South Korea</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* TO Field */}
            <div className="group flex flex-col gap-2">
              <label
                htmlFor="to"
                className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider pl-1"
              >
                To
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <select
                  id="to"
                  name="to"
                  className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 pl-12 pr-10 py-3.5 text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 cursor-pointer"
                >
                  <option value="mongolia">Mongolia</option>
                  <option value="china">China</option>
                  <option value="us">United States</option>
                  <option value="japan">Japan</option>
                  <option value="korea">South Korea</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* DATE Field */}
            <div className="group flex flex-col gap-2">
              <label
                htmlFor="departure"
                className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider pl-1"
              >
                Departure Date
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="date"
                  id="departure"
                  name="departure"
                  className="w-full appearance-none rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 pl-12 pr-4 py-3.5 text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:border-blue-500 dark:focus:border-blue-400 cursor-pointer [color-scheme:light] dark:[color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-6 flex justify-center">
            <button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 px-12 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0">
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search Tours
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
