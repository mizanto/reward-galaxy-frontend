import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import FamilyBlock from '../components/Family/FamilyBlock';
import GoalsBlock from '../components/Goals/GoalsBlock';

// Mock data 

const goals = [
  {
    id: 1,
    title: "Игрушечная машинка",
    price: 80,
    image: "https://dmtoy.ru/upload/iblock/0d6/uozkz2tphsa16tdu6rdnwx7olyntu2t7/igrushechnaya-mashinka-muromets-avtomobil_samosval-polese-44112.jpeg",
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
    image: "https://colapsar.ru/upload/iblock/341/341ee44944632a20d6a1eb507e3447bb.jpg",
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
    price: 10,
    image: "https://gollandia.com/wp-content/uploads/2019/01/books.gif",
  },
  {
    id: 6,
    title: "Аквапарк",
    price: 120,
    image: "https://xpresent.ru/filecache/cache/a0508641720578d2e0180c8418fe5176.jpeg",
  },
];

const Home = () => {
  const currentUser = useSelector(state => state.auth.user);
  return currentUser.role === "parent" ? (
    <Grid 
      templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 2fr", lg: "1fr 3fr"}}
      gap={4}
      w="100%"
      h="100%"
    >
      <GridItem overflow="auto">
        <FamilyBlock/>
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