import React from 'react'
import { PropTypes } from 'react'
import Red5ProPublisher from '../../Red5ProPublisher' // eslint-disable-line no-unused-vars
import PublisherStatus from '../PublisherStatus' // eslint-disable-line no-unused-vars
import BackLink from '../../BackLink' // eslint-disable-line no-unused-vars

const FACING_MODE_FRONT = 'user'
const FACING_MODE_REAR = 'environment'

class PublisherCameraSwapTest extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      facingModeFront: true,
      supported: navigator.mediaDevices.getSupportedConstraints()["facingMode"],
      statusEvent: undefined
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  onCameraSwapRequest () {
    this.setState(state => {
      state.facingModeFront = !state.facingModeFront
      return state
    })
  }

  handlePublisherEvent (event) {
    this.setState(state => {
      state.statusEvent = event
      return state
    })
  }

  publisherEstablished (publisher, view) {
    console.log(`[PublisherCameraSwapTest] publisher: ${publisher}, ${view}`)
  }

  render () {
    const hintClass = ['hint-block', this.state.supported ? '' : 'hint-alert'].join(' ')
    const supportedStr = this.state.supported ? 'supports' : 'does not support'
    const userMedia = {
      video: {
        facingMode: this.state.facingModeFront ? FACING_MODE_FRONT : FACING_MODE_REAR
      }
    }
    return (
      <div>
        <BackLink onClick={this.props.onBackClick} />
        <h1 className="centered">Publisher Camera Swap Test</h1>
        <hr />
        <h2 className="centered"><em>stream</em>: {this.props.settings.stream1}</h2>
        <p className={hintClass}><em>The browser you are using </em><strong>{supportedStr}</strong><em> the </em><code>facingMode</code><em> video constraint require for this test.</em></p>
        <PublisherStatus event={this.state.statusEvent} />
        <div onClick={this.onCameraSwapRequest.bind(this)}>
          <Red5ProPublisher
            className="centered"
            mediaClassName="video-element"
            showControls={true}
            userMedia={userMedia}
            configuration={this.props.settings}
            streamName={this.props.settings.stream1}
            onPublisherEstablished={this.publisherEstablished.bind(this)}
            onPublisherEvent={this.handlePublisherEvent.bind(this)}
            ref={c => this._red5ProPublisher = c}
            />
        </div>
      </div>
    )
  }

}

PublisherCameraSwapTest.propTypes = {
  settings: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
}

export default PublisherCameraSwapTest
