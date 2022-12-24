import { FormWrapper } from './FormWrapper';

type AccountFormData = {
  email: string;
  password: string;
};

type AccountFormPropd = AccountFormData & {
  updateFields: (fields: Partial<AccountFormData>) => void;
};

export function AccountForm({
  email,
  password,
  updateFields
}: AccountFormPropd) {
  return (
    <FormWrapper title="Account information">
      <label>Email</label>
      <input
        autoFocus
        required
        type="email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <label>Password</label>
      <input
        required
        type="password"
        value={password}
        onChange={(e) =>
          updateFields({
            password: e.target.value
          })
        }
      />
    </FormWrapper>
  );
}
