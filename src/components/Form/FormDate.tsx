"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Label } from "../ui/label";

const DatePicker = ({ field }: { field: any }) => {
  const [date, setDate] = React.useState<any>(field.value);

  React.useEffect(() => {
    const formatedDate = date && format(date, "dd/MM/yyyy");
    console.log("this is date", formatedDate);
    field.onChange(formatedDate);
  }, [date]);

  return (
    <div className=" flex flex-col gap-y-2.5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full  max-w-xs justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "P") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            selected={date}
            onSelect={setDate}
            fromYear={1960}
            toYear={2030}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
