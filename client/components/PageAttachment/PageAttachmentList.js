// @flow
import React from 'react'

import Attachment from './Attachment'

type Props = {
  attachments?: Array<any>,
  inUse?: Object,
  onAttachmentDeleteClicked?: Function,
}

export default class PageAttachmentList extends React.Component<Props> {
  render() {
    if (this.props.attachments <= 0) {
      return null
    }

    const attachmentList = this.props.attachments.map((attachment, idx) => {
      return (
        <Attachment
          key={'page:attachment:' + attachment._id}
          attachment={attachment}
          inUse={this.props.inUse[attachment._id] || false}
          onAttachmentDeleteClicked={this.props.onAttachmentDeleteClicked}
        />
      )
    })

    return <ul>{attachmentList}</ul>
  }
}
