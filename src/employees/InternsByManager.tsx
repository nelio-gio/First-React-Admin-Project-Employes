import { useRecordContext, useGetList } from 'react-admin';
import {
  Typography, List, ListItem, ListItemText,
  CircularProgress, Alert, Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

export const InternsByManager = () => {
  const employee = useRecordContext();

  
  const { data: interns, total, isPending, error } = useGetList(
    'interns',
    {
      filter:     { managerId: employee?.id },
      pagination: { page: 1, perPage: 100 },
      sort:       { field: 'lastname', order: 'ASC' },
    },
    { enabled: !!employee?.id } 
  );

  if (isPending) return <CircularProgress size={20} />;
  if (error)     return <Alert severity="error">Erreur lors du chargement des stagiaires.</Alert>;

  return (
    <div style={{ marginTop: 16 }}>
      <Typography variant="h6">
        Stagiaires encadrés ({total ?? 0})
      </Typography>
      <Divider sx={{ my: 1 }} />

    
      {(!interns || interns.length === 0) ? (
        <Typography color="text.secondary">Aucun stagiaire rattaché.</Typography>
      ) : (
        <List dense>
          {interns.map(intern => (
            <ListItem key={intern.id} disablePadding>
              <ListItemText
                primary={
                  <Link to={`/interns/${intern.id}/show`}>
                    {intern.firstname} {intern.lastname}
                  </Link>
                }
                secondary={`${intern.department} — ${intern.isRemunerate ? `${intern.remuneration} €` : 'Non rémunéré'}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
