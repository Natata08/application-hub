import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'
import InputField from './InputField'

const DatePickerField = ({
  control,
  name,
  label,
  errors,
  defaultValue,
  sx,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue ? new Date(defaultValue) : null}
      render={({ field }) => (
        <DatePicker
          label={label}
          {...field}
          sx={sx}
          TextFieldComponent={(params) => (
            <InputField {...params} errors={errors} id={name} />
          )}
        />
      )}
    />
  )
}

export default DatePickerField
