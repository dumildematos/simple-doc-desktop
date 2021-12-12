import React, { useState } from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const ChatEditor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function Chat() {
  const [chatData, setChatData] = useState({
    comments: [],
    submitting: false,
    value: '',
  });

  const handleSubmit = () => {
    console.log(chatData);
    if (!chatData.value) {
      return;
    }

    setChatData({
      comments: chatData.comments,
      submitting: true,
      value: chatData.value,
    });

    setTimeout(() => {
      setChatData({
        submitting: false,
        value: '',
        comments: [
          ...chatData.comments,
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{chatData.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  const handleChange = (e: { target: { value: any } }) => {
    setChatData({
      value: e.target.value,
      comments: chatData.comments,
      submitting: chatData.submitting,
    });
  };

  return (
    <>
      {chatData.comments.length > 0 && (
        <CommentList comments={chatData.comments} />
      )}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <ChatEditor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={chatData.submitting}
            value={chatData.value}
          />
        }
      />
    </>
  );
}
