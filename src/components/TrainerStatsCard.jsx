// import React from 'react';
// import { 
//   Paper, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Typography, 
//   Box,
//   styled 
// } from '@mui/material';
// import { Assignment, CheckCircle, Cancel } from '@mui/icons-material';

// // Styled components for custom styling
// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   marginBottom: theme.spacing(4),
//   borderRadius: theme.spacing(2),
//   background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
// }));

// const StyledCard = styled(Card)(({ gradient }) => ({
//   background: gradient,
//   borderRadius: '24px',
//   boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
//   }
// }));

// const IconContainer = styled(Box)(({ theme }) => ({
//   display: 'inline-flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   width: 64,
//   height: 64,
//   borderRadius: '50%',
//   backgroundColor: 'rgba(255,255,255,0.25)',
//   backdropFilter: 'blur(10px)',
//   marginBottom: theme.spacing(2),
//   boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
// }));

// const ValueTypography = styled(Typography)(({ theme }) => ({
//   fontWeight: 'bold',
//   color: 'white',
//   marginBottom: theme.spacing(1),
//   textShadow: '0 2px 4px rgba(0,0,0,0.3)',
//   fontSize: '3rem'
// }));

// const LabelTypography = styled(Typography)(({ theme }) => ({
//   color: 'rgba(255,255,255,0.95)',
//   fontWeight: 500,
//   textShadow: '0 1px 2px rgba(0,0,0,0.2)',
//   fontSize: '1.1rem'
// }));

// const TrainerStatsSection = () => {
//   const stats = [
//     {
//       icon: Assignment,
//       value: 24,
//       label: 'Assigned',
//       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     },
//     {
//       icon: CheckCircle,
//       value: 18,
//       label: 'Completed',
//       gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'
//     },
//     {
//       icon: Cancel,
//       value: 3,
//       label: 'Declined',
//       gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)'
//     }
//   ];

//   return (
//     <StyledPaper elevation={3}>
//       <Typography 
//         variant="h5" 
//         sx={{ 
//           mb: 3, 
//           fontWeight: 600, 
//           color: '#2c3e50',
//           fontSize: '1.5rem'
//         }}
//       >
//         Training Statistics
//       </Typography>
      
//       <Grid container spacing={3}>
//         {stats.map((stat, index) => {
//           const IconComponent = stat.icon;
//           return (
//             <Grid item xs={12} sm={4} key={index}>
//               <StyledCard gradient={stat.gradient}>
//                 <CardContent sx={{ p: 3, textAlign: 'center' }}>
//                   <IconContainer>
//                     <IconComponent 
//                       sx={{ 
//                         fontSize: 32, 
//                         color: 'white',
//                         filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
//                       }} 
//                     />
//                   </IconContainer>
                  
//                   <ValueTypography variant="h3">
//                     {stat.value}
//                   </ValueTypography>
                  
//                   <LabelTypography variant="h6">
//                     {stat.label}
//                   </LabelTypography>
//                 </CardContent>
//               </StyledCard>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </StyledPaper>
//   );
// };

// export default TrainerStatsSection;



import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  styled,
  CircularProgress,
  Button
} from '@mui/material';
import { Assignment, CheckCircle, Cancel } from '@mui/icons-material';

// Styled components for custom styling
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
}));

const StyledCard = styled(Card)(({ gradient }) => ({
  background: gradient,
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 48px rgba(0,0,0,0.2)'
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  backgroundColor: 'rgba(255,255,255,0.25)',
  backdropFilter: 'blur(10px)',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
  marginBottom: theme.spacing(1),
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  fontSize: '3rem'
}));

const LabelTypography = styled(Typography)(({ theme }) => ({
  color: 'rgba(255,255,255,0.95)',
  fontWeight: 500,
  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
  fontSize: '1.1rem'
}));

const TrainerStatsSection = () => {
  const [statsData, setStatsData] = useState({
    Scheduled: 0,
    Completed: 0,
    Cancelled: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats data from API
  const fetchStatsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/trainers/685b01cc9113e8144d3920f2/stats');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setStatsData(data.stats);
    } catch (err) {
      console.error('Error fetching stats data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchStatsData();
  }, []);

  const stats = [
    {
      icon: Assignment,
      value: statsData.Scheduled,
      label: 'Scheduled',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: CheckCircle,
      value: statsData.Completed,
      label: 'Completed',
      gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'
    },
    {
      icon: Cancel,
      value: statsData.Cancelled,
      label: 'Cancelled',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)'
    }
  ];

  // Loading state
  if (loading) {
    return (
      <StyledPaper elevation={3}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 600, 
            color: '#2c3e50',
            fontSize: '1.5rem'
          }}
        >
          Training Statistics
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress size={60} />
        </Box>
      </StyledPaper>
    );
  }

  // Error state
  if (error) {
    return (
      <StyledPaper elevation={3}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 600, 
            color: '#2c3e50',
            fontSize: '1.5rem'
          }}
        >
          Training Statistics
        </Typography>
        
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Error Loading Statistics
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={fetchStatsData}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1,
              fontWeight: 600
            }}
          >
            Retry
          </Button>
        </Box>
      </StyledPaper>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3, 
          fontWeight: 600, 
          color: '#2c3e50',
          fontSize: '1.5rem'
        }}
      >
        Training Statistics
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Grid item xs={12} sm={4} key={index}>
              <StyledCard gradient={stat.gradient}>
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <IconContainer>
                    <IconComponent 
                      sx={{ 
                        fontSize: 32, 
                        color: 'white',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }} 
                    />
                  </IconContainer>
                  
                  <ValueTypography variant="h3">
                    {stat.value}
                  </ValueTypography>
                  
                  <LabelTypography variant="h6">
                    {stat.label}
                  </LabelTypography>
                </CardContent>
              </StyledCard>
            </Grid>
          );
        })}
      </Grid>
    </StyledPaper>
  );
};

export default TrainerStatsSection;