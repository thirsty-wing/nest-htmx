import * as Html from '@kitajs/html';
import Layout from '@/components/layout';
import TableData from './TableData';

export function UsersRoute({
  q = '',
  tees = new Set(),
}: {
  q?: string;
  tees?: Set<string>;
}) {
  const checkboxQueryParams = [];

  if (tees.has('XS')) {
    checkboxQueryParams.push('xstee=on');
  }

  if (tees.has('S')) {
    checkboxQueryParams.push('stee=on');
  }

  if (tees.has('M')) {
    checkboxQueryParams.push('mtee=on');
  }

  if (tees.has('L')) {
    checkboxQueryParams.push('ltee=on');
  }

  if (tees.has('XL')) {
    checkboxQueryParams.push('xltee=on');
  }

  if (tees.has('2XL')) {
    checkboxQueryParams.push('xxltee=on');
  }

  if (tees.has('3XL')) {
    checkboxQueryParams.push('xxxltee=on');
  }

  const checkboxQueryParamsString = checkboxQueryParams.reduce(
    (paramsString, param, index) => {
      return paramsString + (index === 0 ? '?' : '&') + param;
    },
    '',
  );

  return (
    <Layout title="Home">
      <main
        class="container-fluid"
        style="display: flex; flex-direction: row; flex: 1; gap: 24px;"
      >
        <aside style="border-right: solid gray; width: 100px;">
          <nav>
            <ul>
              <a href="/users">Users</a>
            </ul>
          </nav>
        </aside>
        <div style="display: flex; flex-direction: column; flex: 1">
          <form id="searchform">
            <fieldset role="group">
              <input
                type="search"
                name="q"
                placeholder="search for users..."
                hx-target="#table-body"
                hx-trigger="input changed delay:500ms"
                hx-params="*"
                hx-swap="innerHTML scroll:#table-container:top"
                hx-replace-url="true"
                value={q}
              />
              <input type="submit" value="Search" />
            </fieldset>
          </form>
          <form id="filters">
            <fieldset>
              <legend>Choose tee shirt size filter:</legend>
              <input name="xstee" type="checkbox" checked={tees.has('XS')} />
              <label for="xstee">XS</label>
              <input name="stee" type="checkbox" checked={tees.has('S')} />
              <label for="stee">S</label>
              <input name="mtee" type="checkbox" checked={tees.has('M')} />
              <label for="mtee">M</label>
              <input name="ltee" type="checkbox" checked={tees.has('L')} />
              <label for="ltee">L</label>
              <input name="xltee" type="checkbox" checked={tees.has('XL')} />
              <label for="xltee">XL</label>
              <input name="xxltee" type="checkbox" checked={tees.has('2XL')} />
              <label for="xxltee">2XL</label>
              <input name="xxxltee" type="checkbox" checked={tees.has('3XL')} />
              <label for="xxxltee">3XL</label>
            </fieldset>
            <input type="submit" value="Apply Filters" />
          </form>
          <div id="table-container" style="display: flex; overflow: auto;">
            <table style="table-layout: fixed;">
              <thead style="position: sticky; top: 0;">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Department</th>
                  <th>Shirt Size</th>
                </tr>
              </thead>
              <tbody id="table-body" style="overflow: auto;">
                <TableData q={q} tees={tees} />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default UsersRoute;
