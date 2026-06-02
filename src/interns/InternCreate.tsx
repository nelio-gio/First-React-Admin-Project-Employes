import {
  Create, SimpleForm, TextInput, NumberInput,
  SelectInput, BooleanInput, ReferenceInput,
  required, minValue, email,
} from 'react-admin';
import { useWatch } from 'react-hook-form';

const departmentChoices = [
  { id: 'Informatique', name: 'Informatique' },
  { id: 'Marketing',    name: 'Marketing'    },
  { id: 'RH',           name: 'RH'           },
  { id: 'Finance',      name: 'Finance'       },
];


const ManagerSelectInput = () => {
  const department = useWatch({ name: 'department' });

  return (
    <ReferenceInput
      source="managerId"
      reference="employees"
      filter={department ? { department, active: true } : { active: true }}
    >
      <SelectInput
        label="Manager"
        optionText={r => `${r.firstname} ${r.lastname}`}
        validate={required()}
      />
    </ReferenceInput>
  );
};


const RemunerationInput = () => {
  const isRemunerate = useWatch({ name: 'isRemunerate' });

  return (
    <NumberInput
      source="remuneration"
      label="Rémunération (€)"
      validate={isRemunerate ? [required(), minValue(0)] : []}
    />
  );
};

export const InternCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <TextInput source="firstname"  label="Prénom"      validate={required()} />
      <TextInput source="lastname"   label="Nom"         validate={required()} />
      <TextInput source="email"      label="Email"       validate={[required(), email()]} />
      <SelectInput
        source="department"
        label="Département"
        choices={departmentChoices}
        validate={required()}
      />

      <ManagerSelectInput />
      <BooleanInput source="isRemunerate" label="Rémunéré" defaultValue={false} />
      <RemunerationInput />
    </SimpleForm>
  </Create>
);
