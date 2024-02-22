import * as Html from '@kitajs/html';
import { users } from '@/data/users';

export function TableData({
  page = 0,
  size = 30,
  q = '',
  tees = new Set(),
}: {
  page?: number;
  size?: number;
  q?: string;
  tees?: Set<string>;
}) {
  const supposedStartIdx = page * size;
  const supposedEndIdx = supposedStartIdx + size;

  let nextPageQueryParams = `page=${page + 1}&size=${size}`;

  if (q.length > 0) {
    nextPageQueryParams += `&q=${q}`;
  }

  if (tees.has('XS')) {
    nextPageQueryParams += `&xstee=on`;
  }

  if (tees.has('S')) {
    nextPageQueryParams += `&stee=on`;
  }

  if (tees.has('M')) {
    nextPageQueryParams += `&mtee=on`;
  }

  if (tees.has('L')) {
    nextPageQueryParams += `&ltee=on`;
  }

  if (tees.has('XL')) {
    nextPageQueryParams += `&xltee=on`;
  }

  if (tees.has('2XL')) {
    nextPageQueryParams += `&xxltee=on`;
  }

  if (tees.has('3XL')) {
    nextPageQueryParams += `&xxxltee=on`;
  }

  return (
    <>
      {users
        .filter((user) => {
          console.log('the Q', q);
          if (q && !user.fullName.toLowerCase().includes(q.toLowerCase())) {
            return false;
          }
          if (tees.size > 0 && !tees.has(user.shirtSize)) {
            return false;
          }
          return true;
        })
        .slice(supposedStartIdx, supposedEndIdx)
        .map((user, sliceIdx) => {
          const shouldRequestNextPage =
            supposedStartIdx + sliceIdx === supposedEndIdx - 1 && // is last in page
            users.length > supposedEndIdx; // is not the very last one
          return (
            <tr
              hx-get={shouldRequestNextPage && `/users?${nextPageQueryParams}`}
              hx-trigger={shouldRequestNextPage && 'intersect once'}
              hx-swap={shouldRequestNextPage && 'afterend'}
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
