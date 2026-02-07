import React from 'react';
import { Box, Text } from 'ink';
import { cliTheme } from './theme.js';

export const Header: React.FC = () => {
  return (
    <Box flexDirection="column" marginBottom={1} borderStyle="single" borderColor={cliTheme.colors.accent} paddingX={2}>
      <Text color={cliTheme.colors.accent} bold>
        {cliTheme.typography.header}
      </Text>
      <Text color={cliTheme.colors.muted}>
        {cliTheme.typography.tagline}
      </Text>
    </Box>
  );
};

export const StatusLine: React.FC<{ status: string; color?: string }> = ({ status, color = cliTheme.colors.muted }) => (
  <Box marginBottom={1}>
    <Text color={cliTheme.colors.muted}>[</Text>
    <Text color={color}>{status.toUpperCase()}</Text>
    <Text color={cliTheme.colors.muted}>]</Text>
  </Box>
);
