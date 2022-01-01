import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ pageCount, handlePageClick }) {
  return (
    <React.Fragment>
      {pageCount >0  && <ReactPaginate
        previousLabel={pageCount === 1 ? '' : '<'}
        nextLabel={pageCount > 1 ? '>' : ''}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount > 1 ? pageCount : ''}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(page)=>handlePageClick(page)}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active hidden'}
      />}
    </React.Fragment>
  );
}
