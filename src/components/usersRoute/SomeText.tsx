import * as Html from "@kitajs/html";

export function SomeText({ shouldShow }: { shouldShow: boolean }) {
  if (!shouldShow) {
    return <></>;
  }

  return <h2>Here's some text!</h2>;
}

export default SomeText;
