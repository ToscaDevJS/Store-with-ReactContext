import { Debugger } from "@/components/Debugger";
import { Products } from "@/components/Products";
import { SelectedCategory } from "@/components/SelectedCategory";
import { IS_DEVELOPMENT } from "@/config";

export default function Home() {
  return (
    <main>
      <SelectedCategory />
      <Products />
      {IS_DEVELOPMENT && <Debugger />}
    </main>
  );
}
