'use client';
import { useState, useEffect } from 'react';
import { Card, Text, Button, Group, Image, Container, Loader } from '@mantine/core';
import Link from 'next/link';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
  image: string;
}

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Image style={{ width: '50%' }} src={post.image} alt={post.title} height={50} width={50} fit="cover" radius="md" />
      <Text fw={500} size="lg" mt="md">{post.title}</Text>
      <Text size="sm" color="dimmed">
        {new Date(post.date).toLocaleDateString()}
      </Text>
      <Text size="sm" mt="md" color="dimmed">
        {post.body.substring(0, 100)}...
      </Text>
      <Group mt="md">
        <Link href={`/post/${post.id}`} passHref>
          <Button variant="outline">Ver Mais</Button>
        </Link>
      </Group>
    </Card>
  );
};

export default function PaginaInicial() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const postsData = response.data.map((post: any) => ({
          id: post.id.toString(),
          title: post.title,
          body: post.body,
          date: new Date().toISOString(),
          image: 'https://via.placeholder.com/600x200.png?text=Imagem+do+Post',
        }));
        setPosts(postsData);  
      } catch (err) {
        setError('Erro ao carregar as postagens');
      } finally {
        setLoading(false);  
      }
    };

    fetchPosts();
  }, []); 

  if (loading) {
    return (
      <Container>
        <Loader size="xl" />
        <Text color="dimmed">Carregando postagens...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Text color="red">{error}</Text>
      </Container>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
