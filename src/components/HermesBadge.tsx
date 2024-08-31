/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { View, StyleSheet, Text, useColorScheme } from 'react-native';
import Colors from './Colors';
import React from 'react';

const HermesBadge = (): React.ReactNode => {
  const isDarkMode = useColorScheme() === 'dark';
  // const version =
  //   global.HermesInternal?.getRuntimeProperties?.()['OSS Release Version'] ??
  //   '';
  return /** global.HermesInternal ? */ (
    <View style={styles.badge}>
      <Text
        style={[
          styles.badgeText,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {`Engine: esbuild`}
      </Text>
    </View>
  ) /** : null */;
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default HermesBadge;
