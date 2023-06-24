import { useState } from "react";
import { DateInput } from "@mantine/dates";

export default function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DateInput
      value={value}
      onChange={setValue}
      placeholder="Transaction Date"
      maw={400}
      mx="auto"
    />
  );
}
