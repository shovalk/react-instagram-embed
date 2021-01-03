import 'normalize.css/normalize.css';
import 'highlight.js/styles/github.css';
import 'react-ghfork/gh-fork-ribbon.css';
import './App.css';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Fork from 'react-ghfork';
import InstagramEmbed from 'react-instagram-embed';
import hljs from 'highlight.js';

interface State {
  url: string;
  maxWidth?: string;
  hideCaption: boolean;
}

class App extends Component<{}, State> {
  public state = { url: urls[0], maxWidth: '375', hideCaption: false };

  private numberInputRef = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    this.highlight();
  }

  public componentDidUpdate() {
    this.highlight();
  }

  public render() {
    const { url, maxWidth, hideCaption } = this.state;
    return (
      <div>
        <Fork project="sugarshin/react-instagram-embed" className="right" />
        <div
          className="body"
          style={{
            maxWidth: this.state.maxWidth ? `${this.state.maxWidth}px` : 'auto'
          }}
        >
          <h1>React Instagram Embed</h1>
          <InstagramEmbed
            className="instagram-embed"
            url={this.state.url}
            maxWidth={parseInt(this.state.maxWidth, 10)}
            hideCaption={this.state.hideCaption}
            clientAccessToken={'513908128626683|65c0919b7399a68861abeab2c3300c2d'}
          />
          <div className="ui">
            <span className="ui-label">Hide caption</span>
            <input type="checkbox" checked={this.state.hideCaption} onChange={this.handleCaptionChange} />
          </div>
          <div className="ui">
            <span className="ui-label">Max width</span>
            <input type="number" defaultValue={this.state.maxWidth} min={320} ref={this.numberInputRef} />
            <button onClick={this.handleMaxWidthChange}>Change</button>
          </div>
          <div className="ui">
            <span className="ui-label">Select photo</span>
            <select value={this.state.url} onChange={this.hanldeURLSelect}>
              {urls.map(u => (
                <option value={u} key={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
          <pre>
            <code>{getCode(url, maxWidth, hideCaption)}</code>
          </pre>
        </div>
      </div>
    );
  }

  private highlight(): void;

  private highlight() {
    [...document.querySelectorAll('pre code')].forEach(el => hljs.highlightBlock(el));
  }

  private handleMaxWidthChange = () => {
    const value = parseInt(this.numberInputRef.current!.value, 10);
    this.setState({ maxWidth: value >= 320 ? `${value}` : undefined });
  };

  private hanldeURLSelect = (e: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ url: e.currentTarget.value });
  };

  private handleCaptionChange = () => {
    this.setState({ hideCaption: !this.state.hideCaption });
  };
}

const urls = ['https://www.instagram.com/p/CJeMTfnpDO5/', 'https://www.instagram.com/p/CJeCh3IpbCW/'];

const getCode = (url: string, maxWidth: string, hideCaption: boolean) => `<InstagramEmbed
  clientAccessToken='<appId>|<clientToken>'
  url='${url}'
  maxWidth={${maxWidth}}
  hideCaption={${hideCaption}}
  containerTagName='div'
  injectScript
  protocol=''
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>`;

export default hot(module)(App);
