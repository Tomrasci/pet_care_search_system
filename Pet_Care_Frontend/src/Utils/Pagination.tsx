import React from "react";
import "./PaginationStyles.css";

const Pagination = ({
  advertisementsPerPage,
  totalAdvertisements,
  paginate,
}: any) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(totalAdvertisements / advertisementsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item" color="green">
              <a
                onClick={() => paginate(number)}
                className="page-link"
                color="green"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
