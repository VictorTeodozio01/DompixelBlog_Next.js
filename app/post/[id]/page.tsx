'use client';
import { Container, Title, Text, Image, Loader } from '@mantine/core';
import axios from 'axios';

interface Post {
  id: string;  
  title: string;
  body: string;
  date: string;
  image: string;
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  let post: Post | null = null;

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    post = {
      id,
      title: response.data.title,
      body: response.data.body,
      date: new Date().toISOString(),
      image: 'https://via.placeholder.com/600',
    };
  } catch (error) {
    return (
      <Container>
        <Text color="red">Erro ao carregar a postagem. Tente novamente mais tarde.</Text>
      </Container>
    );
  }

  if (!post) {
    return <Loader size="xl" />;
  }

  return (
    <Container>
      <Title order={1} mb="md">{post.title}</Title>
      <Image style={{ width: '50%' }} src={post.image} alt={post.title} mb="md" />
      <Text size="sm" color="dimmed">{new Date(post.date).toLocaleDateString()}</Text>
      <Text mt="md">{post.body}</Text>
    </Container>
  );
}
