import { ReactNode } from "react";
import { Box, Text } from "@/constants/theme";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  return (
    <Box>
      <Text variant="body">{title}</Text>
      <Box
        mt="l"
        mb="l"
        bg="tabBackground"
        borderRadius={8}
        borderWidth={1}
        borderColor="tabBackground"
      >
        {children}
      </Box>
    </Box>
  );
};
