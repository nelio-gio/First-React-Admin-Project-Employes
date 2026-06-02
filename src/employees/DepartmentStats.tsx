import { useRecordContext, useGetList } from 'react-admin';
import { Typography, Chip, CircularProgress } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

export const DepartmentStats = () => {
  const employee = useRecordContext();

  const { total, isPending } = useGetList(
    'employees',
    {
      filter:     { department: employee?.department, active: true },
      pagination: { page: 1, perPage: 1 },
    },
    { enabled: !!employee?.department }
  );

  if (isPending) return <CircularProgress size={16} />;

  const colleagues = (total ?? 1) - 1;

  return (
    <div style={{ marginTop: 8 }}>
      <Typography variant="subtitle2" gutterBottom>
        <GroupIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        Département : {employee?.department}
      </Typography>
      <Chip
        label={`${colleagues} collègue${colleagues > 1 ? 's' : ''} actif${colleagues > 1 ? 's' : ''}`}
        color="primary"
        variant="outlined"
        size="small"
      />
    </div>
  );
};
