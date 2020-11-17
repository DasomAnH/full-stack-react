import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Dimmer,
  Header,
  Image,
  Loader,
  Segment,
  Container,
} from 'semantic-ui-react';
import textImage from '../short-paragraph.png';
import Comments from './Comments';

export default function PostDetail() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  // const {delete, deletePost} = props

  useEffect(() => {
    fetch(`/api/v1/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
      });
  }, [postId]);

  // const handleDelete (()=>{
  //   fetch(`/api/v1/posts/${postId}`)
  //     .then(res => deletePost(id))
  //     .catch(error => console.log(error))
  // })

  if (!post) {
    return (
      <Segment>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
        <Image src={textImage} />
      </Segment>
    );
  }

  return (
    <>
      <Header as='h1'>{post.title}</Header>
      <Segment vertical>
        <Container>
          <Header size='small'>Author: {post.author}</Header>
          {post.content.split('\n').map((paragraph, i) => {
            return <p key={i}>{paragraph}</p>;
          })}
        </Container>
        <Comments />
        <Link to='/'>Back to the List</Link>
      </Segment>
    </>
  );
}
