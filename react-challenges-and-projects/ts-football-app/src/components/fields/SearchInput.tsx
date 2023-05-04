import { Input, FormControl, FormLabel } from '@chakra-ui/react';


interface SearchInputProps {
  label: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ label, onChange, id }) => {
  return (
    <FormControl id={id}>
      <FormLabel>{label}</FormLabel>
      <Input placeholder="" onChange={onChange} size="md" />
    </FormControl>
  );
};

export default SearchInput;