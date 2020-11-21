import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { paginationDataVar } from '../graphql/apolloClient';
import { useRouter } from 'next/router';

const PagingOffsetLimitControl = ({ lastPage }) => {
  const paginationData = useReactiveVar(paginationDataVar);
  const { currentPage } = paginationData;
  const router = useRouter();
  function processPageChange(currentPageNew) {
    paginationDataVar({
      ...paginationData,
      currentPage: currentPageNew,
    });
    router.push(`/?page=${currentPageNew + 1}`, undefined, {
      shallow: true,
    });
  }
  return (
    <div className="pagination">
      <a
        onClick={() => {
          processPageChange(0);
        }}
        className="page-link"
        href="#"
        aria-label="First"
      >
        <i className="fa fa-angle-double-left" aria-hidden="true"></i>
      </a>
      <a
        onClick={() => {
          if (currentPage > 0) {
            processPageChange(currentPage - 1);
          }
        }}
        className="page-link"
        href="#"
        aria-label="Previous"
      >
        <i className="fa fa-angle-left" aria-hidden="true"></i>
      </a>
      &nbsp;{currentPage + 1}&nbsp;
      <a
        onClick={() => {
          if (currentPage < lastPage) {
            processPageChange(currentPage + 1);
          }
        }}
        className="page-link"
        href="#"
        aria-label="Next"
      >
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </a>
      <a
        onClick={() => {
          processPageChange(lastPage);
        }}
        className="page-link"
        href="#"
        aria-label="Last"
      >
        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
      </a>
    </div>
  );
};

export default PagingOffsetLimitControl;
