import { useRecordContext, useGetOne } from 'react-admin';
import { Card, CardContent, Typography, Chip, CircularProgress, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export const ManagerCard = () => {
  const intern = useRecordContext();

  const { data: manager, isPending, error } = useGetOne(
    'employees',
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  
  if (isPending) return <CircularProgress size={24} />;
  if (error)     return <Alert severity="error">Impossible de charger le manager.</Alert>;
  if (!manager)  return null;

  return (
    <Card variant="outlined" sx={{ mt: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          👤 Manager : {manager.firstname} {manager.lastname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Département : {manager.department}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          <a href={`mailto:${manager.email}`}>{manager.email}</a>
        </Typography>
        <Chip
          label={manager.active ? 'Actif' : 'Inactif'}
          color={manager.active ? 'success' : 'default'}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
};
