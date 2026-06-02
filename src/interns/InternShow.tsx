import {
  Show, SimpleShowLayout, TextField, NumberField,
  BooleanField, EmailField, ReferenceField,
  TopToolbar, ListButton, EditButton,
} from 'react-admin';
import { Typography } from '@mui/material';
import { ManagerCard } from './ManagerCard';

const InternShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const InternShow = () => (
  <Show actions={<InternShowActions />}>
    <SimpleShowLayout>
      <Typography variant="h6">Informations du stagiaire</Typography>
      <TextField   source="firstname"  label="Prénom"      />
      <TextField   source="lastname"   label="Nom"         />
      <EmailField  source="email"      label="Email"       />
      <TextField   source="department" label="Département" />
      <NumberField
        source="remuneration"
        label="Rémunération"
        options={{ style: 'currency', currency: 'EUR' }}
      />
      <BooleanField source="isRemunerate" label="Rémunéré" />

      <ReferenceField source="managerId" reference="employees" label="Manager" link="show">
        <TextField source="firstname" />{' '}
        <TextField source="lastname"  />
      </ReferenceField>

      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);
