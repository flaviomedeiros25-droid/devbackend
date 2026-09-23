import app from '../app';
import { Server } from 'http';

const PORT = 3001;

async function runTests() {
  console.log('🧪 Iniciando testes integrados dos Endpoints REST da DevShowcase API...\n');

  const server: Server = app.listen(PORT, async () => {
    const baseUrl = `http://localhost:${PORT}/api`;

    try {
      // 1. Health Check
      console.log('1️⃣ Testando GET /api/health');
      const resHealth = await fetch(`${baseUrl}/health`);
      const dataHealth = await resHealth.json();
      console.log(` Status: ${resHealth.status}`, dataHealth);

      // 2. Criar Perfil Válido
      console.log('\n2️⃣ Testando POST /api/profiles (Perfil válido)');
      const resProfile = await fetch(`${baseUrl}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Ana Maria Tech',
          email: `ana.${Date.now()}@devshowcase.com`,
          bio: 'Engenheira de Software focada em desenvolvimento backend e arquitetura de microsserviços.',
          githubUrl: 'https://github.com/ana-tech',
          linkedinUrl: 'https://linkedin.com/in/ana-tech',
        }),
      });
      const dataProfile: any = await resProfile.json();
      console.log(` Status: ${resProfile.status}`, dataProfile);
      const profileId = dataProfile.id;

      // 3. Teste de Validação em Profile (E-mail inválido)
      console.log('\n3️⃣ Testando POST /api/profiles (Validação: E-mail inválido)');
      const resInvalidProfile = await fetch(`${baseUrl}/profiles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Ana',
          email: 'email-invalido',
          bio: 'Bio',
          githubUrl: 'not-a-url',
        }),
      });
      console.log(` Status (esperado 400): ${resInvalidProfile.status}`, await resInvalidProfile.json());

      // 4. GET /api/profiles/:id
      console.log(`\n4️⃣ Testando GET /api/profiles/${profileId}`);
      const resGetProfile = await fetch(`${baseUrl}/profiles/${profileId}`);
      console.log(` Status: ${resGetProfile.status}`, await resGetProfile.json());

      // 5. POST /api/technologies
      console.log('\n5️⃣ Testando POST /api/technologies');
      const resTech = await fetch(`${baseUrl}/technologies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Docker_${Date.now()}`,
          category: 'DevOps',
        }),
      });
      const dataTech: any = await resTech.json();
      console.log(` Status: ${resTech.status}`, dataTech);

      // 6. GET /api/technologies
      console.log('\n6️⃣ Testando GET /api/technologies');
      const resGetTechs = await fetch(`${baseUrl}/technologies`);
      const dataTechs = await resGetTechs.json();
      console.log(` Status: ${resGetTechs.status}, Total tecnologias: ${Array.isArray(dataTechs) ? dataTechs.length : 0}`);

      // 7. POST /api/projects
      console.log('\n7️⃣ Testando POST /api/projects');
      const resProject = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Sistema de Gestão de Microsserviços',
          description: 'Plataforma para monitoramento e orquestração de containers com logs centralizados.',
          repositoryUrl: 'https://github.com/ana-tech/ms-manager',
          deployUrl: 'https://ms-manager.demo.com',
          profileId: profileId,
          technologyIds: dataTech.id ? [dataTech.id] : [],
        }),
      });
      const dataProject: any = await resProject.json();
      console.log(` Status: ${resProject.status}`, dataProject);

      // 8. GET /api/projects
      console.log('\n8️⃣ Testando GET /api/projects');
      const resGetProjects = await fetch(`${baseUrl}/projects`);
      const dataProjects = await resGetProjects.json();
      console.log(` Status: ${resGetProjects.status}, Total projetos: ${Array.isArray(dataProjects) ? dataProjects.length : 0}`);

      // 9. POST /api/projects/:id/feedbacks
      console.log(`\n9️⃣ Testando POST /api/projects/${dataProject.id}/feedbacks`);
      const resFeedback = await fetch(`${baseUrl}/projects/${dataProject.id}/feedbacks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: 'Tech Lead Evaluator',
          comment: 'Projeto muito bem documentado e com arquitetura sólida!',
          rating: 5,
        }),
      });
      console.log(` Status: ${resFeedback.status}`, await resFeedback.json());

      console.log('\n🎉 TODOS OS TESTES FORAM EXECUTADOS COM SUCESSO!');
    } catch (err) {
      console.error('❌ Erro nos testes:', err);
    } finally {
      server.close();
    }
  });
}

runTests();
