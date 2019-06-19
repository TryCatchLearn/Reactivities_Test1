import React from 'react';
import { Message, MessageHeader, MessageContent } from 'semantic-ui-react';
import { AxiosResponse } from 'axios';

interface IProps {
    error: AxiosResponse,
    text?: string
}

const ErrorMessage: React.FC<IProps> = ({ error, text }) => {
    return (
        <Message error>
          <MessageHeader>{error.statusText}</MessageHeader>
          {error.data && Object.keys(error.data.errors).length > 0 && (
              <Message.List>
                  {Object.values(error.data.errors).flat().map((err, i) => (
                      <Message.Item key={i}>{err}</Message.Item>
                  ))}
              </Message.List>
          )}
          {text && <MessageContent content={text} />}
        </Message>
      );
} 

export default ErrorMessage
