import { Box } from "@/constants/theme/theme";

type ScreenProps = {
  children: React.ReactNode;
};

export const Screen = ({ children }: ScreenProps) => {
  return (
    <Box backgroundColor="mainBackground" flex={1}>
      {children}
    </Box>
  );
};
