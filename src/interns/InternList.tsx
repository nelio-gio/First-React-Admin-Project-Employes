import { useState } from "react";
import {
  List, .Datagrid, TextField, NumberField, BooleanField,
  ReferenceField, SelectInput, BooleanInput,
  EditButton, DeleteButton, TopToolbar, CreateButton,
  useCreate, useRefresh,
} from 'react-admin';
import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField as MuiTextField, Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const QuickAddIntern = () => {
  const [open, setOpen]         = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname]   = useState('');
  const [managerId, setManagerId] = useState('');


  const [create, { isPending, error }] = useCreate();


  const refresh = useRefresh();

  const handleSubmit = () => {
    create(
      'interns',
      { data: { firstname, lastname, managerId: parseInt(managerId) } },
      {
        onSuccess: () => {
          setOpen(false);
          setFirstname(''); setLastname(''); setManagerId('');
          refresh(); 
        },
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
    setFirstname(''); setLastname(''); setManagerId('');
  };

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        variant="outlined"
        size="small"
      >
        Ajouter stagiaire rapide
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Ajout rapide d'un stagiaire</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          {error ? <Alert severity="error">Erreur : {(error as Error).message ?? 'Erreur inconnue'}</Alert> : null}
          <MuiTextField
            label="Prénom"
            value={firstname}
            onChange={e => setFirstname(e.target.value)}
            fullWidth
          />
          <MuiTextField
            label="Nom"
            value={lastname}
            onChange={e => setLastname(e.target.value)}
            fullWidth
          />
          <MuiTextField
            label="ID du manager"
            type="number"
            value={managerId}
            onChange={e => setManagerId(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={handleSubmit}
            disabled={isPending || !firstname || !lastname || !managerId}
            variant="contained"
          >
            {isPending ? 'Création...' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// ─── Barre d'actions de la liste ───────────────────────────────────────────

const InternListActions = () => (
  <TopToolbar>
    <QuickAddIntern />
    <CreateButton />
  </TopToolbar>
);

// ─── Filtres ───────────────────────────────────────────────────────────────

const departmentChoices = [
  { id: 'Informatique', name: 'Informatique' },
  { id: 'Marketing',    name: 'Marketing'    },
  { id: 'RH',           name: 'RH'           },
  { id: 'Finance',      name: 'Finance'       },
];

const internFilters = [
  <SelectInput source="department"   choices={departmentChoices} alwaysOn />,
  <BooleanInput source="isRemunerate" label="Rémunéré" />,
];

// ─── Liste principale ──────────────────────────────────────────────────────

export const InternList = () => (
  <List filters={internFilters} actions={<InternListActions />} perPage={5}>
    <Datagrid rowClick="show">
      <TextField source="firstname"  label="Prénom"      />
      <TextField source="lastname"   label="Nom"         />
      <TextField source="email"      label="Email"       />
      <TextField source="department" label="Département" />

      {/* ReferenceField : résout managerId → appel GET /employees/:id */}
      <ReferenceField source="managerId" reference="employees" label="Manager">
        <TextField source="firstname" />{' '}
        <TextField source="lastname"  />
      </ReferenceField>

      <NumberField
        source="remuneration"
        label="Rémunération"
        options={{ style: 'currency', currency: 'EUR' }}
      />
      <BooleanField source="isRemunerate" label="Rémunéré" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
