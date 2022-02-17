// import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@mui/material";
import { Controller } from "react-hook-form";

export const ControlledAutocomplete = ({
  options = [],
  renderInput,
  getOptionLabel,
  onChange: ignored,
  control,
  defaultValue,
  name,
  renderOption,
}) => {
  return (
    <Controller
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
        ...props
      }) => {
        const realValue =
          options.find((e) => e?.value === value?.value) || null;
        return (
          <Autocomplete
            options={options}
            getOptionLabel={getOptionLabel}
            renderInput={renderInput}
            onChange={(e, data) => onChange(data)}
            value={realValue}
            // inputRef={ref}
            // {...props}
          />
        );
      }}
      onChange={([, data]) => data}
      defaultValue={defaultValue}
      name={name}
      control={control}
    />
  );
};
