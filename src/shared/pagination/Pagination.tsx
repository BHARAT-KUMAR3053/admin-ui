import { v4 as uuid } from 'uuid';

const Pagination = ({
  count,
  currentPage,
  setCurrentPage
}: {
  count: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div>
      <>
        <nav aria-label="Page navigation example">
          <ul className="flex h-8 items-center -space-x-px text-sm">
            <li>
              <a
                href="#"
                className={`previous-page ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 0 ? 'cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (currentPage === 0) {
                    return;
                  }
                  setCurrentPage((prev) => prev - 1);
                }}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
                </svg>
              </a>
            </li>
            {Array.from({ length: count }, (_, item) => item + 1).map((item) => (
              <li key={uuid()}>
                <a
                  href="#"
                  className={`flex h-8 items-center justify-center border border-gray-300 ${item === currentPage + 1 ? 'bg-blue-200' : 'bg-white'} px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  onClick={() => setCurrentPage(item - 1)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className={`next-page flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === count - 1 ? 'cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (currentPage === count - 1) {
                    return;
                  }
                  setCurrentPage((prev) => prev + 1);
                }}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-2.5 w-2.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </>
    </div>
  );
};

export default Pagination;
