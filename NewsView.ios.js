import React, {
  Component,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

import TableView, {
  Item,
  Section
} from 'react-native-tableview';

const TOP_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const ITEM_URL = 'https://hacker-news.firebaseio.com/v0/item/';

class NewsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      newsItems: []
    };
  }

  async componentDidMount() {
    let newsItems = await this.fetchTop();
    this.setState({
      newsItems,
      loaded: true
    });
  }

  async fetchTop() {
    try {
      let top = (await (await fetch(TOP_URL)).json()).slice(0, 20);
      let results = [];
      for (let item of top) {
        results.push(await (await fetch(`${ITEM_URL}${item}.json`)).json());
      }
      return results;
    } catch (err) {
      console.log(err);
    }
  }

  onRowPressed(item) {
    this.props.navigator.push({
      title: item.title,
      component: WebView,
      passProps: {
        source: {
          uri: item.url
        },
        style: styles.webview,
        startInLoadingState: true,
        scalesPagesToFit: true
      }
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>
          Loading news...
        </Text>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      let items = this.state.newsItems.map((item) => {
        return <Item key={item.id} onPress={() => this.onRowPressed(item)}>{item.title}</Item>;
      });
      return (
        <TableView style={styles.container}
                   allowsMultipleSelection={true}
                   tableViewStyle={TableView.Consts.Style.Grouped}
                   tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}>
          <Section>
            {items}
          </Section>
        </TableView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    marginBottom: 8
  }, loading: {
    flex: 1,
    paddingTop: 32,
    fontSize: 30
  }, webview: {
    flex: 1
  }
});

export default NewsView;
