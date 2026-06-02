import { useRecordContext, useUpdate } from 'react-admin';
import { Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const QuickStatusToggle = () => {
  const record = useRecordContext();

  const [update, { isPending }] = useUpdate();

  if (!record) return null;

  const handleToggle = () => {
    update(
      'employees',
      {
        id:           record.id,
        data:         { active: !record.active },  
        previousData: record,                     
      }
    );
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}  
      size="small"
      variant="outlined"
      color={record.active ? 'error' : 'success'}
      startIcon={record.active ? <CancelIcon /> : <CheckCircleIcon />}
    >
      {record.active ? 'Désactiver' : 'Activer'}
    </Button>
  );
};
