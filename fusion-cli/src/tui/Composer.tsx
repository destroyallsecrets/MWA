import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { cliTheme } from './theme.js';

interface ComposerProps {
  onInput: (value: string) => void;
  isProcessing: boolean;
}

export const Composer: React.FC<ComposerProps> = ({ onInput, isProcessing }) => {
  const [query, setQuery] = useState('');

  return (
    <Box marginTop={1} paddingX={1} borderStyle="round" borderColor={isProcessing ? cliTheme.colors.muted : cliTheme.colors.accent}>
      <Box marginRight={1}>
        <Text color={cliTheme.colors.accent} bold>{'>'}</Text>
      </Box>
      {isProcessing ? (
        <Text color={cliTheme.colors.muted}>Orchestrating consciousness...</Text>
      ) : (
        <TextInput
          value={query}
          onChange={setQuery}
          onSubmit={(value) => {
            onInput(value);
            setQuery('');
          }}
        />
      )}
    </Box>
  );
};
