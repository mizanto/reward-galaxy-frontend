import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import FamilyBlock from '../components/Family/FamilyBlock';
import GoalsBlock from '../components/Goals/GoalsBlock';

const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isParent = currentUser.role === "parent";

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return isParent ? (
    <Grid 
      templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 2fr", lg: "1fr 3fr"}}
      gap={4}
      w="100%"
      h="100%"
    >
      <GridItem overflow="auto">
        <FamilyBlock />
      </GridItem>
      <GridItem overflow="auto">
        <GoalsBlock />
      </GridItem>
    </Grid>
  ) : (
    <Box w="100%" h="100%">
      <GoalsBlock />
    </Box>
  );
};

export default Home;