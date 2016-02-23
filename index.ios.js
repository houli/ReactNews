/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import NewsView from './NewsView';

class ReactNews extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigation}
        barTintColor='#ff6600'
        titleTextColor='white'
        initialRoute={{
          component: NewsView,
          title: 'Hacker News'
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    flex: 1
  }
});

AppRegistry.registerComponent('ReactNews', () => ReactNews);
