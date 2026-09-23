import { prisma } from '../config/database';

async function main() {
  console.log('🌱 Limpando banco de dados...');
  await prisma.feedback.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  console.log('✨ Criando tecnologias de exemplo...');
  const techNode = await prisma.technology.create({
    data: { name: 'Node.js', category: 'Backend' },
  });

  const techReact = await prisma.technology.create({
    data: { name: 'React', category: 'Frontend' },
  });

  const techTS = await prisma.technology.create({
    data: { name: 'TypeScript', category: 'Linguagem' },
  });

  const techSQLite = await prisma.technology.create({
    data: { name: 'SQLite', category: 'Banco de Dados' },
  });

  console.log('👨‍💻 Criando perfil de desenvolvedor...');
  const profile = await prisma.profile.create({
    data: {
      name: 'Flávio Desenvolvedor',
      email: 'flavio@devshowcase.com',
      bio: 'Desenvolvedor Full Stack apaixonado por arquitetura backend e APIs RESTful.',
      githubUrl: 'https://github.com/flavio-dev',
      linkedinUrl: 'https://linkedin.com/in/flavio-dev',
    },
  });

  console.log('🚀 Criando projeto com relacionamentos...');
  const project = await prisma.project.create({
    data: {
      title: 'DevShowcase Platform API',
      description: 'API RESTful para vitrine de projetos e perfis de desenvolvedores com persistência relacional.',
      repositoryUrl: 'https://github.com/flavio-dev/devshowcase-api',
      deployUrl: 'https://devshowcase.api.dev',
      profileId: profile.id,
      technologies: {
        connect: [
          { id: techNode.id },
          { id: techTS.id },
          { id: techSQLite.id },
        ],
      },
    },
  });

  console.log('💬 Criando feedback inicial...');
  await prisma.feedback.create({
    data: {
      author: 'Avaliador Acadêmico',
      comment: 'Excelente estrutura de projeto, endpoints e modelagem relacional 1:N e N:N bem definidos!',
      rating: 5,
      projectId: project.id,
    },
  });

  console.log('✅ Carga de dados (seed) concluída com sucesso!');
  console.log(`📌 Profile ID gerado: ${profile.id}`);
  console.log(`📌 Project ID gerado: ${project.id}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
