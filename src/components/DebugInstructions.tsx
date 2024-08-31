/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from 'react';

import { StyleSheet, Platform, Text } from "react-native";

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

const DebugInstructions: () => React.ReactNode = Platform.select({
  ios: () => (
    <Text>
      Press <Text style={styles.highlight}>Cmd + D</Text> in the simulator or{' '}
      <Text style={styles.highlight}>Shake</Text> your device to open the Dev
      Menu.
    </Text>
  ),
  default: () => (
    <Text>
      Press <Text style={styles.highlight}>Cmd or Ctrl + M</Text> or{' '}
      <Text style={styles.highlight}>Shake</Text> your device to open the Dev
      Menu.
    </Text>
  ),
});

export default DebugInstructions;
