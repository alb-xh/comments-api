import { Pagination } from "./types.js"

export const restrictPagination = (pagination: Pagination): Pagination => ({
  offset: pagination.offset > 0 ? pagination.offset : 0,
  limit: pagination.limit < 20 ? pagination.limit : 20,
});
