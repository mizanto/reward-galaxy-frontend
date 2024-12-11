import React from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import FamilyBlock from '../components/Family/FamilyBlock';
import GoalsBlock from '../components/Goals/GoalsBlock';

// Mock data 

const currentUser = {
  id: 1,
  role: 'child', // 'parent' или 'child'
  name: 'Иван'
};

const familyData = {
  parents: [
    { id: 1, name: 'Иван', role: 'parent' },
    { id: 2, name: 'Мария', role: 'parent' }
  ],
  children: [
    { id: 3, name: 'Дима', role: 'child', balance: 10 },
    { id: 4, name: 'Аня', role: 'child', balance: 5 }
  ]
};

const goals = [
  {
    id: 1,
    title: "Игрушечная машинка",
    price: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Книга",
    price: 30,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Набор для рисования",
    price: 70,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Игрушечная машинка",
    price: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Книга",
    price: 30,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "Набор для рисования",
    price: 70,
    image: "https://via.placeholder.com/150",
  },
];

const Home = () => {
  return currentUser.role === "parent" ? (
    <Grid 
      templateColumns={{ base: "1fr", sm: "1fr 3fr" }}
      gap={4}
      w="100%"
      h="100%"
    >
      <GridItem overflow="auto">
        <FamilyBlock currentUser={currentUser} family={familyData} />
      </GridItem>
      <GridItem overflow="auto">
        <GoalsBlock currentUser={currentUser} goals={goals} />
      </GridItem>
  </Grid>
  ) : (
    <Box
      w="100%"
      h="100%"
    >
      <GoalsBlock currentUser={currentUser} goals={goals} />
    </Box>
  );
};

export default Home;