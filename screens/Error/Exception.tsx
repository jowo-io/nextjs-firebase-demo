import Header from "@/client/ui/atoms/Header";

export interface Props {}

export default function ErrorExceptionScreen({}: Props) {
  return (
    <div className="gap-xs py-xs flex w-full flex-col">
      <Header tag="h2">An error occurred</Header>
      <p className="text-black dark:text-white">
        Sorry, something went wrong and the app crashed. Please refresh the
        page!
      </p>
    </div>
  );
}
