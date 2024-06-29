import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePicker(
  { label, value, onChange }: {
    label: string,
    value: Dayjs | null,
    onChange: (newValue: Dayjs | null) => void
  }
) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
      />
    </LocalizationProvider>
  );
}
