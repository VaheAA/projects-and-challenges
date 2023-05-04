import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

interface TextInputProps {
  name: string;
  placeholder: string;
  label: string;
  register: any;
  type?: string;
  errors: any;
}

const TextInput: React.FC<TextInputProps> = ({ name, placeholder, label, type, register, errors }) => {

  return (
    <FormControl id={name} isInvalid={errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input {...register(name)} type={type} name={name} placeholder={placeholder} size="md" />
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default TextInput;