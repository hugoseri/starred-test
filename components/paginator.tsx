import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "./ui/pagination";

export interface PaginatorProps {
    pagination: StarredApiPagination,
    onClickPrevious: () => void,
    onClickNext: () => void,
}

export const Paginator: React.FC<PaginatorProps> = ({
    onClickNext,
    onClickPrevious,
    pagination,
}) => {
    return (
        <Pagination>
        <PaginationContent>
          {
            pagination.currentPage > pagination.firstPage && (
            <PaginationItem>
              <PaginationPrevious
                onClick={onClickPrevious}
              /> 
            </PaginationItem>
            )
          }
          <PaginationItem>
            Page {pagination.currentPage + 1}
          </PaginationItem>
          {
            pagination.currentPage < pagination.lastPage && (
            <PaginationItem>
              <PaginationNext
                onClick={onClickNext}
              /> 
            </PaginationItem>
            )
          }
        </PaginationContent>
      </Pagination>
    )
}