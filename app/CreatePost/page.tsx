'use client';
import { useState } from 'react';
import { TextInput, Textarea, Button, Container, Title, Group, Paper } from '@mantine/core';

const CreatePost = ({ onAddPost }: { onAddPost: (post: { title: string; body: string; image: string }) => void }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = { title, body, image };
    onAddPost(newPost); 
    setTitle('');       
    setBody('');
    setImage('');
  };

  return (
    <Container size="sm" my={40}>
      <Paper  >
        <Title order={2} mb="lg" style={{ color: '#1A202C' }}>Criar Nova Postagem</Title>

        <form onSubmit={handleSubmit}>
          <Group>
            <TextInput
              label="Título"
              placeholder="Título da postagem"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              size="md"
              style={{ width: '100%' }}
            />
            <TextInput
              label="Imagem de Capa (URL)"
              placeholder="URL da imagem"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              size="md"
              style={{ width: '100%' }}
            />
            <Textarea
              label="Conteúdo"
              placeholder="Conteúdo da postagem"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              minRows={5}
              style={{ width: '100%' }}
            />
            <Button type="submit" fullWidth color="blue" size="lg">Criar Postagem</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost;
