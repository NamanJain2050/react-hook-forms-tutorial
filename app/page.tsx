import FormWithReactHookForm from "@/components/form-w-react-hook-form";
import FormWithReactHookFormAndZod from "@/components/form-w-react-hook-form-zod";
import FormWithoutReactHookForm from "@/components/form-wo-react-hook-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <FormWithoutReactHookForm /> */}
      {/* <FormWithReactHookForm /> */}
      <FormWithReactHookFormAndZod />
    </main>
  );
}
