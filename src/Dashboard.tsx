import { useGetList } from 'react-admin';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const StatCard = ({
  title,
  value,
  isPending,
  color = '#1976d2',
}: {
  title: string;
  value: number | undefined;
  isPending: boolean;
  color?: string;
}) => (
  <Card variant="outlined">
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {isPending ? (
        <CircularProgress size={32} />
      ) : (
        <Typography variant="h3" fontWeight="bold" color={color}>
          {value ?? '—'}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmployees, isPending: p1 } = useGetList('employees', {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: activeEmployees, isPending: p2 } = useGetList('employees', {
    filter:     { active: true },
    pagination: { page: 1, perPage: 1 },
  });

  const { total: totalInterns, isPending: p3 } = useGetList('interns', {
    pagination: { page: 1, perPage: 1 },
  });

  const { total: remuneratedInterns, isPending: p4 } = useGetList('interns', {
    filter:     { isRemunerate: true },
    pagination: { page: 1, perPage: 1 },
  });

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h5" gutterBottom>
        Tableau de bord RH
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total employés"        value={totalEmployees}     isPending={p1} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Employés actifs"       value={activeEmployees}    isPending={p2} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total stagiaires"      value={totalInterns}       isPending={p3} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Stagiaires rémunérés"  value={remuneratedInterns} isPending={p4} color="#ed6c02" />
        </Grid>
      </Grid>
    </div>
  );
};
