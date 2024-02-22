import * as Html from "@kitajs/html";
import Layout from "@/components/layout";
import TableData from "./TableData";

export function UsersRoute({
  q = "",
  tees = new Set(),
}: {
  q?: string;
  tees?: Set<string>;
}) {
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
          <form>
            <div class="grid">
              <input
                type="search"
                name="q"
                placeholder="search for users..."
                hx-get="/users"
                hx-target="#table-body"
                hx-trigger="input changed delay:500ms, submit"
                hx-swap="innerHTML scroll:#table-container:top"
                hx-replace-url="true"
                value={q}
              />
              <input type="submit" value="Apply Filters" />
            </div>
            <fieldset>
              <legend>Choose tee shirt size filter:</legend>
              <input name="xstee" type="checkbox" checked={tees.has("xstee")} />
              <label for="xstee">XS</label>
              <input name="stee" type="checkbox" checked={tees.has("stee")} />
              <label for="stee">S</label>
              <input name="mtee" type="checkbox" checked={tees.has("mtee")} />
              <label for="mtee">M</label>
              <input name="ltee" type="checkbox" checked={tees.has("ltee")} />
              <label for="ltee">L</label>
              <input name="xltee" type="checkbox" checked={tees.has("xltee")} />
              <label for="xltee">XL</label>
              <input
                name="xxltee"
                type="checkbox"
                checked={tees.has("xxltee")}
              />
              <label for="xxltee">2XL</label>
              <input
                name="xxxltee"
                type="checkbox"
                checked={tees.has("xxxltee")}
              />
              <label for="xxxltee">3XL</label>
            </fieldset>
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
                <TableData q={q} />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default UsersRoute;
