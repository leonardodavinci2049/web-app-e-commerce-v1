import {
  Building2,
  CheckCircle,
  Cookie,
  Eye,
  FileText,
  Lock,
  Mail,
  Server,
  Shield,
  UserCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { envs } from "@/core/config/envs";

export const metadata: Metadata = {
  title: `Política de Privacidade - ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
  description: `Política de privacidade e proteção de dados da ${envs.NEXT_PUBLIC_COMPANY_NAME}. Saiba como coletamos, utilizamos e protegemos suas informações pessoais e empresariais.`,
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString("pt-BR");
  const companyName = envs.NEXT_PUBLIC_COMPANY_NAME;
  const companyEmail = envs.NEXT_PUBLIC_COMPANY_EMAIL;
  const companyPhone = envs.NEXT_PUBLIC_COMPANY_PHONE;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Header Principal */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Shield className="text-primary h-8 w-8" />
          <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
            Política de Privacidade
          </h1>
        </div>
        <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
          Nosso compromisso é respeitar sua privacidade e garantir o sigilo de
          todas as informações que você nos fornece em nossa plataforma de
          e-commerce atacadista.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Comércio B2B Atacadista
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Atualizado em {currentDate}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            LGPD Compliance
          </Badge>
        </div>
      </div>

      {/* Compromisso de Privacidade */}
      <Card className="mb-8 border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
            <div>
              <h3 className="mb-2 font-semibold text-green-800 dark:text-green-200">
                Nosso Compromisso com Sua Privacidade
              </h3>
              <p className="text-sm leading-relaxed text-green-700 dark:text-green-300">
                Obrigado por dedicar este tempo para ler nossa política de
                privacidade. Os dados cadastrais dos clientes{" "}
                <strong>
                  não são vendidos, trocados ou divulgados para terceiros
                </strong>
                , exceto quando necessário para entrega, cobrança ou
                participação em promoções solicitadas. Ao usar nossos serviços,
                você aceita as práticas descritas nesta política.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Navegação Lateral */}
        <aside className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Navegação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <nav className="space-y-1">
                <a
                  href="#cookies"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  1. Cookies e Tecnologias
                </a>
                <a
                  href="#personal-data"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  2. Dados Pessoais
                </a>
                <a
                  href="#navigation-data"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  3. Dados de Navegação
                </a>
                <a
                  href="#data-usage"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  4. Uso das Informações
                </a>
                <a
                  href="#security"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  5. Segurança e Proteção
                </a>
                <a
                  href="#hosting"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  6. Segurança da Hospedagem
                </a>
                <a
                  href="#communications"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  7. Comunicações por E-mail
                </a>
                <a
                  href="#spam"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  8. Política Anti-Spam
                </a>
                <a
                  href="#login"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  9. Login e Senhas
                </a>
                <a
                  href="#advertising"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  10. Publicidade
                </a>
                <a
                  href="#modifications"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  11. Modificações
                </a>
                <a
                  href="#rights"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  12. Seus Direitos
                </a>
                <a
                  href="#contact"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  13. Contato
                </a>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Conteúdo Principal */}
        <div className="space-y-8 lg:col-span-3">
          {/* 1. Cookies e Tecnologias */}
          <Card id="cookies">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Cookie className="text-primary h-5 w-5" />
                1. Cookies e Tecnologias
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Como a maioria dos sites da web, usamos a tecnologia denominada{" "}
                <strong>Cookies</strong>. O uso de cookies é feito apenas para
                reconhecer um visitante constante e melhorar a experiência de
                compra.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Os cookies são pequenos arquivos de dados transferidos de um
                site da web para o disco do seu computador e{" "}
                <strong>não armazenam dados pessoais</strong>. Se preferir, você
                pode apagar os cookies existentes através do seu navegador.
              </p>

              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                  🔧 Gerenciamento de Cookies
                </h4>
                <p className="mb-3 text-sm text-blue-700 dark:text-blue-300">
                  Os principais navegadores permitem gerenciar cookies. Nossa
                  recomendação é manter o salvamento de cookies ligado para
                  utilizar todos os recursos de navegação personalizada.
                </p>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    <strong>Para remover cookies:</strong>
                  </p>
                  <ul className="mt-2 list-inside list-disc space-y-1">
                    <li>
                      Google Chrome: Configurações → Privacidade e segurança
                    </li>
                    <li>Firefox: Configurações → Privacidade e segurança</li>
                    <li>Safari: Preferências → Privacidade</li>
                    <li>Edge: Configurações → Cookies e permissões de site</li>
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground mt-4 leading-relaxed">
                Este website utiliza cookies e informações de navegação com o
                objetivo de traçar um perfil do público que visita o site e
                aperfeiçoar nossos serviços, produtos e garantir as melhores
                ofertas. Durante todo este processo{" "}
                <strong>mantemos suas informações em sigilo absoluto</strong>.
              </p>
            </CardContent>
          </Card>

          {/* 2. Dados Pessoais */}
          <Card id="personal-data">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserCheck className="text-primary h-5 w-5" />
                2. Obtenção de Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                São coletadas informações pessoais capazes de identificar os
                usuários quando estes:
              </p>

              <div className="mt-4 grid gap-4">
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">📝 Cadastro no Sistema</h4>
                  <p className="text-muted-foreground text-sm">
                    Se cadastram no site {companyName} usando formulários de
                    registro empresarial.
                  </p>
                </div>
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">
                    🛠️ Interação com Ferramentas
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Interagem com ferramentas do Portal, fornecendo informações
                    voluntariamente.
                  </p>
                </div>
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">
                    📧 Newsletter e Comunicações
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Assinam nossa newsletter para receber ofertas e novidades do
                    atacado.
                  </p>
                </div>
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">💬 Canal de Contato</h4>
                  <p className="text-muted-foreground text-sm">
                    Entram em contato através do canal &ldquo;Fale
                    Conosco&rdquo;.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-700">
                  <strong>⏰ Retenção de Dados:</strong> As informações
                  coletadas serão automaticamente excluídas de nossos servidores
                  quando deixarem de ser úteis para os fins para os quais foram
                  coletadas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3. Dados de Navegação */}
          <Card id="navigation-data">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Eye className="text-primary h-5 w-5" />
                3. Obtenção de Informações Navegacionais
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Coletamos basicamente dois tipos de informações através de
                formulários de cadastro:
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <h4 className="text-foreground mb-2 font-semibold">
                    📋 Informações Fornecidas
                  </h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Dados de cadastro empresarial</li>
                    <li>• Informações de contato</li>
                    <li>• Preferências comerciais</li>
                    <li>• Dados fiscais (CNPJ/CPF)</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <h4 className="text-foreground mb-2 font-semibold">
                    🔍 Dados Coletados Automaticamente
                  </h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Características do dispositivo</li>
                    <li>• Tipo de navegador</li>
                    <li>• Endereço IP (com data e hora)</li>
                    <li>• Páginas acessadas</li>
                    <li>• Informações sobre cliques</li>
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground mt-4 leading-relaxed">
                Os cookies permitem o reconhecimento dos computadores que
                acessam os sites e acompanham a navegação do usuário,
                personalizando-a de acordo com o perfil de cada cliente.
                <strong>Os cookies não armazenam informações pessoais</strong>,
                apenas contêm dados de login do usuário.
              </p>

              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  <strong>🛡️ Outras Tecnologias:</strong> Podem ser utilizadas
                  tecnologias como pixel tags, beacons e local shared objects,
                  sempre respeitando os termos desta política e as opções de
                  coleta e armazenamento.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Uso das Informações */}
          <Card id="data-usage">
            <CardHeader>
              <CardTitle className="text-xl">
                4. Utilização das Informações
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Consideramos todas as informações coletadas como{" "}
                <strong>confidenciais</strong>. O usuário declara ter ciência e
                concorda que podemos utilizar as informações para os seguintes
                propósitos:
              </p>

              <div className="mt-4 grid gap-3">
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Viabilizar a interatividade entre cliente e administrador
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Informar sobre novos produtos e eventos
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Recolher estatísticas sobre comportamento dos visitantes
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Manter cadastros atualizados para contato
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Aperfeiçoar usabilidade e experiência de navegação
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Elaborar estatísticas gerais sem identificação dos usuários
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Garantir segurança e responder dúvidas ou solicitações
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Realizar pesquisas e campanhas de marketing de
                    relacionamento
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>📧 Controle de E-mails:</strong> Caso não deseje mais
                  receber informativos publicitários, acesse seu perfil e
                  desmarque a opção &ldquo;Cancelar envio de emails&rdquo;.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 5. Segurança e Proteção */}
          <Card id="security">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lock className="text-primary h-5 w-5" />
                5. Precauções de Segurança e Proteção de Dados
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Garantimos a privacidade dos dados cadastrais armazenados em
                nossa base, comprometendo-nos a utilizar tecnologia adequada
                para proteção, mantendo ambiente seguro com ferramentas
                apropriadas e controles eficientes de segurança da informação.
              </p>

              <div className="mt-4 grid gap-4">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-800">
                    🔐 Medidas de Segurança
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Tecnologia adequada para proteção de informações</li>
                    <li>• Ferramentas apropriadas de segurança</li>
                    <li>
                      • Controles eficientes sempre observando o estado da
                      técnica
                    </li>
                    <li>• Acesso restrito apenas a pessoas autorizadas</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <h4 className="mb-2 font-semibold text-amber-800">
                    ⚠️ Limitações de Responsabilidade
                  </h4>
                  <p className="text-sm text-amber-700">
                    Considerando que nenhum sistema de segurança é absolutamente
                    seguro, nos eximimos de responsabilidades por eventuais
                    danos decorrentes de vírus, invasões em nossa base de dados
                    e demais falhas relacionadas, salvo se houver dolo ou culpa
                    de nossa empresa.
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mt-4 leading-relaxed">
                Os profissionais que administram este site têm conhecimento
                desta política e apenas pessoal qualificado e autorizado tem
                permissão para acessar dados pessoais dos usuários, sob pena de
                sanção disciplinar em caso de violação.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Exigimos de empresas parceiras e prestadores de serviços a
                garantia de proteção e privacidade de dados quando há
                necessidade de compartilhamento.
              </p>

              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">
                  <strong>🚨 Importante:</strong> Nenhuma transmissão de dados
                  na Internet é 100% segura. Embora sempre façamos o possível
                  para proteger suas informações, não é possível garantir a
                  segurança absoluta. É uma decisão pessoal a utilização do
                  serviço nessas condições.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. Segurança da Hospedagem */}
          <Card id="hosting">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Server className="text-primary h-5 w-5" />
                6. Segurança da Estrutura de Hospedagem
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="grid gap-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="mb-2 font-semibold">
                    🛡️ Medidas Modernas de Segurança
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Utilizamos as medidas mais modernas de segurança para
                    proteger informações pessoais, restringindo acesso apenas a
                    pessoas devidamente autorizadas.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="mb-2 font-semibold">
                    🔧 Sistemas de Proteção
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Nossos sistemas web e internos possuem dispositivos contra
                    invasão como IPS (Intrusion Prevention System), Firewalls de
                    Rede e de Aplicação, além de sistemas Anti-DDoS.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="mb-2 font-semibold">🖥️ Firewall do Servidor</h4>
                  <p className="text-muted-foreground text-sm">
                    O servidor que hospeda o {companyName} trabalha com firewall
                    que impede acesso de usuários e sistemas não autorizados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. Comunicações por E-mail */}
          <Card id="communications">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="text-primary h-5 w-5" />
                7. Envio de Comunicados e Mensagens por E-mail
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Podemos enviar comunicados e mensagens com ofertas de produtos e
                serviços a usuários cadastrados ou clientes em geral, utilizando
                todos os tipos de tecnologias e meios de comunicação disponíveis
                (e-mail, SMS, MMS, mala-direta, etc.).
              </p>

              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-800">
                  📧 Cancelamento de Comunicações
                </h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>
                    O cancelamento do envio de publicidades pode ser solicitado
                    pelos canais:
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Formulário &ldquo;Fale Conosco&rdquo;</li>
                    <li>E-mail: {companyEmail}</li>
                    <li>Telefone: {companyPhone}</li>
                  </ul>
                  <p>
                    <strong>Tempo de processamento:</strong> A solicitação será
                    atendida no tempo mínimo necessário.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm text-amber-700">
                  <strong>⚠️ Opt-out por E-mail:</strong> O cancelamento é feito
                  através do e-mail do usuário. Usuários com mais de um cadastro
                  poderão continuar recebendo comunicados no e-mail que não foi
                  descadastrado.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 8. Política Anti-Spam */}
          <Card id="spam">
            <CardHeader>
              <CardTitle className="text-xl">8. Política Anti-Spam</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <h4 className="mb-2 font-semibold text-red-800">
                  🚫 Não Somos Coniventes com Spam
                </h4>
                <p className="text-sm text-red-700">
                  NÃO praticamos envio de spams. Spam é definido como
                  transmissão de e-mails não solicitados, geralmente comerciais,
                  em grandes quantidades para pessoas sem contato prévio ou que
                  declinaram receber.
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Reservamos o direito de enviar informações sobre produtos que
                possam ter importância para o usuário via e-mail, sempre
                oferecendo a opção de cancelar este serviço.
              </p>

              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  <strong>✅ Política Transparente:</strong> Apenas enviamos
                  comunicações relevantes para usuários cadastrados, sempre com
                  opção clara de descadastro.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 9. Login e Senhas */}
          <Card id="login">
            <CardHeader>
              <CardTitle className="text-xl">9. Login e Senhas</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-800">
                  🔐 Responsabilidade do Usuário
                </h4>
                <p className="text-sm text-blue-700">
                  O login e senha são{" "}
                  <strong>pessoais e intransferíveis</strong>, não podendo ser
                  emprestados, locados, distribuídos ou vendidos a terceiros. O
                  usuário se expõe a riscos financeiros e pessoais quando
                  compartilha credenciais.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">📋 Padrão de Senhas</h4>
                  <p className="text-muted-foreground text-sm">
                    Senhas devem ter no mínimo 8 caracteres com presença de
                    letras e números (alfanumérica) para maior segurança.
                  </p>
                </div>

                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">🛡️ Dicas de Segurança</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Use senhas complexas com combinações longas</li>
                    <li>• Misture letras, números e caracteres especiais</li>
                    <li>• Evite combinações previsíveis do teclado</li>
                    <li>• Nunca compartilhe suas credenciais</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm text-red-700">
                  <strong>⚠️ Isenção de Responsabilidade:</strong> Não nos
                  responsabilizamos por vazamento de informações quando
                  credenciais são compartilhadas indevidamente.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 10. Publicidade */}
          <Card id="advertising">
            <CardHeader>
              <CardTitle className="text-xl">10. Publicidade</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Anúncios que aparecem em nosso site podem ser entregues por
                parceiros de publicidade, que podem utilizar cookies. Estes
                cookies permitem que o servidor de anúncios reconheça seu
                computador para compilar informações sobre você ou outras
                pessoas que usam o computador.
              </p>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <h4 className="text-foreground mb-2 font-semibold">
                  🎯 Anúncios Direcionados
                </h4>
                <p className="text-muted-foreground text-sm">
                  Essas informações permitem que redes de anúncios ofereçam
                  anúncios direcionados que acreditam ser de maior interesse
                  para você, melhorando sua experiência de navegação.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 11. Modificações */}
          <Card id="modifications">
            <CardHeader>
              <CardTitle className="text-xl">
                11. Modificações da Política de Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                Reservamo-nos o direito de alterar esta Política de Privacidade
                a qualquer momento, visando sua constante melhoria e
                aprimoramento. Toda alteração será devidamente informada nesta
                página.
              </p>

              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  <strong>📅 Verificação Regular:</strong> Ao utilizar
                  funcionalidades do site ou interagir com ele, você concorda
                  com os termos da Política vigente na data. Recomendamos
                  verificá-la antes de cada visita.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 12. Seus Direitos */}
          <Card id="rights">
            <CardHeader>
              <CardTitle className="text-xl">
                12. Sobre Sua Privacidade Online
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="mb-2 font-semibold text-green-800">
                  👤 Você é Responsável
                </h4>
                <p className="text-sm text-green-700">
                  Em última análise, você é responsável pela manutenção de sua
                  privacidade e pelo sigilo de suas senhas e informações
                  pessoais.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">
                    👨‍👩‍👧‍👦 Proteção de Menores
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Oriente menores a não compartilharem senhas com estranhos e
                    não fornecerem informações pessoais online sem permissão.
                  </p>
                </div>

                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">
                    📚 Mantenha-se Informado
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Ao acessar a Internet, sempre busque a política de
                    privacidade dos sites que você visita.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 13. Contato */}
          <Card id="contact">
            <CardHeader>
              <CardTitle className="text-xl">13. Contato e Dúvidas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Em caso de dúvidas, sugestões ou solicitações relacionadas à
                nossa política de privacidade, entre em contato conosco:
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold">
                    📞 Canais de Atendimento
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>E-mail:</strong>{" "}
                      <a
                        href={`mailto:${companyEmail}`}
                        className="text-primary hover:underline"
                      >
                        {companyEmail}
                      </a>
                    </p>
                    <p>
                      <strong>Telefone:</strong> {companyPhone}
                    </p>
                    <p>
                      <strong>Formulário:</strong> Canal &ldquo;Fale
                      Conosco&rdquo;
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">
                    🕒 Horário de Atendimento
                  </h4>
                  <div className="text-muted-foreground space-y-2 text-sm">
                    <p>Segunda a Sexta: 8h às 18h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>Respostas em até 24 horas úteis</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  <strong>💚 Mensagem Final:</strong> Respeitamos sua
                  privacidade. Desejamos boas compras e muito sucesso! Obrigado
                  pela confiança.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer da Política */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-2 text-sm">
                  <strong>Política de Privacidade - {companyName}</strong>
                </p>
                <p className="text-muted-foreground text-xs">
                  Copyright © 2011-{new Date().getFullYear()} | Todos os
                  direitos reservados
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  Criado: 06 de Maio de 2018 | Última atualização: {currentDate}
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  E-commerce B2B desenvolvido para vendas atacadistas com
                  proteção de dados
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
