import { Box, Heading, Text, Button, Stack, Flex, Spacer } from '@chakra-ui/react';


const MemberList = ({ title, members, currentUserId, onRemove, onTopUp }) => (
    <Box mb={4}>
      <Heading size="md" mb={2}>{title}</Heading>
      <Stack spacing={2}>
        {members.map((member) => (
          <Flex key={member.id} align="center">
            <Text>
              {member.name} {member.id === currentUserId && '(вы)'}
            </Text>
            {member.id !== currentUserId && onRemove && (
              <Button
                size="xs"
                variant="ghost"
                colorScheme="red"
                ml="2"
                onClick={() => onRemove(member)}
              >
                Удалить
              </Button>
            )}
            {onTopUp && (
              <>
                <Spacer />
                <Text>{member.balance} ⭐️</Text>
                <Button
                  size="sm"
                  colorScheme="teal"
                  ml="2"
                  onClick={() => onTopUp(member.id)}
                >
                  +
                </Button>
              </>
            )}
          </Flex>
        ))}
      </Stack>
    </Box>
  );

  export default MemberList;