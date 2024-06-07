import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcdn/ui/pagination";
import { PaginatorType } from "@/types/movementTypes";
import { FunctionComponent } from "react";

interface PaginatorProps {
  pagination: PaginatorType;
}

const Paginator: FunctionComponent<PaginatorProps> = ({ pagination }) => {
  const { firstPage, currentPage, lastPage } = pagination;

  const PaginatorHandler = () => {
    const slice = 9;
    const nodes = [];
    if (lastPage < slice)
      for (let index = 1; index <= lastPage; index++) {
        nodes.push(
          <PaginationItem>
            <PaginationLink
              isActive={index == currentPage}
              onClick={() => handleOnChangePage(index)}
            >
              {index}
            </PaginationLink>
          </PaginationItem>
        );
      }
    if (currentPage - 8 > 0) {
      for (let index = 1; index <= 4; index++) {
        nodes.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
        nodes.push(
          <PaginationItem>
            <PaginationLink onClick={() => handleOnChangePage(index)}>
              {index}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    return nodes;
  };

  const handleOnChangePage = (index: number) => {
    console.log(index);
  };
  return (
    <>
      {lastPage !== 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious hidden={currentPage == firstPage} />
            </PaginationItem>
            {PaginatorHandler()}
            <PaginationItem>
              <PaginationNext hidden={currentPage == lastPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Paginator;
