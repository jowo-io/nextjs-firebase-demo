import { useRouter } from "next/navigation";

import Button from "@/client/ui/atoms/Button";
import Header from "@/client/ui/atoms/Header";
import { PathNames } from "@/client/utils/links";

export interface Props {}

export default function ErrorNotFoundScreen({}: Props) {
  const { push } = useRouter();

  return (
    <div className="gap-xs py-xs flex w-full flex-col">
      <Header tag="h1">404</Header>
      <Header tag="h4">Sorry, that page doesn&apos;t exist.</Header>
      <p className="mb-md text-black dark:text-white">
        But don&apos;t worry, you can find plenty of other things by navigating
        back to the homepage.
      </p>
      <Button size="lg" onClick={() => push(PathNames.home)}>
        Back to homepage
      </Button>
    </div>
  );
}
