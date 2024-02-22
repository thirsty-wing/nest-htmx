import * as Html from "@kitajs/html";
import { users } from "@/data/users";

export function TableData({
  page = 0,
  size = 30,
  q = "",
  tees = new Set(),
}: {
  page?: number;
  size?: number;
  q?: string;
  tees?: Set<string>;
}) {
  const supposedStartIdx = page * size;
  const supposedEndIdx = supposedStartIdx + size;

  const nextPageQueryParams = [`page=${page + 1}`, `size=${size}`];

  if (q) {
    nextPageQueryParams.push(`q=${q}`);
  }

  return (
    <>
      {users
        .filter(
          (user) => !q || user.fullName.toLowerCase().includes(q.toLowerCase())
        )
        .slice(supposedStartIdx, supposedEndIdx)
        .map((user, sliceIdx) => {
          const shouldRequestNextPage =
            supposedStartIdx + sliceIdx === supposedEndIdx - 1 && // is last in page
            users.length > supposedEndIdx; // is not the very last one
          return (
            <tr
              hx-get={
                shouldRequestNextPage &&
                `/users?${nextPageQueryParams.join("&")}`
              }
              hx-trigger={shouldRequestNextPage && "intersect once"}
              hx-swap={shouldRequestNextPage && "afterend"}
            >
              <th>
                <a href={`/users/${user.id}`}>{user.fullName}</a>
              </th>
              <td>{user.email}</td>
              <td>{user.city}</td>
              <td>{user.department}</td>
              <td>{user.shirtSize}</td>
            </tr>
          );
        })}
    </>
  );
}

export default TableData;
