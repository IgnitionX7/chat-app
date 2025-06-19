import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { PlusCircle, Smile } from "lucide-react";
import { SetStateAction } from "react";

type Props = {
  setEmojiPickerOpen: (value: SetStateAction<boolean>) => void;
};
const MessageActionsPopover = ({ setEmojiPickerOpen }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="secondary">
          <PlusCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full mb-1 flex flex-col gap-2">
        <PopoverClose asChild>
          <Button
            variant="outline"
            onClick={() => {
              setEmojiPickerOpen(true);
            }}
            size="icon"
          >
            <Smile />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
export default MessageActionsPopover;
