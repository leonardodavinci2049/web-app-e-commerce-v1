import {
  AlertTriangle,
  Ban,
  Building2,
  CheckCircle,
  Eye,
  FileText,
  Mail,
  MessageSquare,
  Server,
  Shield,
  UserCheck,
  X,
} from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { envs } from "@/core/config/envs";

export const metadata: Metadata = {
  title: `Política Anti-Spam - ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
  description: `Política Anti-Spam da ${envs.NEXT_PUBLIC_COMPANY_NAME}. Conheça nosso compromisso contra práticas abusivas de e-mail e como garantimos comunicações éticas e responsáveis.`,
};

export default function AntispamPage() {
  const currentDate = new Date().toLocaleDateString("pt-BR");
  const companyName = envs.NEXT_PUBLIC_COMPANY_NAME;
  const companyEmail = envs.NEXT_PUBLIC_COMPANY_EMAIL;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Header Principal */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Ban className="h-8 w-8 text-red-600" />
          <h1 className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-4xl font-bold text-transparent">
            Política Anti-Spam
          </h1>
        </div>
        <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed">
          Nosso compromisso é garantir comunicações éticas e responsáveis. Somos
          totalmente contrários à prática de SPAM e adotamos as melhores
          práticas de e-mail marketing.
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
          <Badge variant="destructive" className="flex items-center gap-2">
            <Ban className="h-4 w-4" />
            Anti-Spam
          </Badge>
        </div>
      </div>

      {/* Declaração Contra Spam */}
      <Card className="mb-8 border-red-200 bg-red-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Ban className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-600" />
            <div>
              <h3 className="mb-2 text-lg font-semibold text-red-800">
                Declaração Anti-Spam
              </h3>
              <p className="leading-relaxed text-red-700">
                A <strong>{companyName}</strong> manifesta-se totalmente{" "}
                <strong>contrária à prática do SPAM</strong>, dentro e fora de
                nossos servidores. Colocamo-nos à disposição dos órgãos
                competentes para colaborar com a erradicação do SPAM e
                incentivamos nossos usuários a apoiar a causa anti-spam.
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
                  href="#what-is-spam"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  1. O que é SPAM?
                </a>
                <a
                  href="#why-problem"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  2. Por que é um Problema?
                </a>
                <a
                  href="#our-commitment"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  3. Nosso Compromisso
                </a>
                <a
                  href="#our-emails"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  4. Nossos E-mails
                </a>
                <a
                  href="#opt-out"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  5. Como Cancelar
                </a>
                <a
                  href="#reporting"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  6. Como Denunciar
                </a>
                <a
                  href="#technical-standards"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  7. Padrões Técnicos
                </a>
                <a
                  href="#contact"
                  className="hover:text-primary block py-1 text-sm transition-colors"
                >
                  8. Contato
                </a>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Conteúdo Principal */}
        <div className="space-y-8 lg:col-span-3">
          {/* 1. O que é SPAM? */}
          <Card id="what-is-spam">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                1. O que é SPAM?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                <strong>SPAM ou Lixo Eletrônico</strong> é o termo atribuído à
                prática de envio de mensagens eletrônicas e mala direta digital
                em massa e <strong>não solicitadas</strong> pelos destinatários.
              </p>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                O SPAM não pode ser considerado E-mail marketing ou Newsletter
                porque não faz uso correto e/ou ético da publicidade online.
              </p>

              <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                <h4 className="mb-3 font-semibold text-red-800 dark:text-red-200">
                  🚨 Características das Mensagens SPAM:
                </h4>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <X className="mt-1 h-4 w-4 flex-shrink-0 text-red-500 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Não possuem remetente identificável ou sua identidade é
                      falsa
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="mt-1 h-4 w-4 flex-shrink-0 text-red-500 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Base de dados não composta por usuários opt-in
                      (consentimento)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="mt-1 h-4 w-4 flex-shrink-0 text-red-500 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Não apresentam opção para opt-out (remoção da lista)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="mt-1 h-4 w-4 flex-shrink-0 text-red-500 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Apresentam abordagem enganosa no assunto da mensagem
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Por que é um Problema? */}
          <Card id="why-problem">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Server className="h-5 w-5 text-orange-600" />
                2. Por que o SPAM é um Problema?
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-orange-800">
                    🖥️ Problemas Técnicos
                  </h4>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Sobrecarregam a capacidade dos servidores</li>
                    <li>• Comprometem a qualidade dos serviços</li>
                    <li>• Prejudicam as redes de comunicação</li>
                    <li>• Consomem espaço na caixa de mensagens</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold text-orange-800">
                    💼 Problemas Comerciais
                  </h4>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li>• Constroem imagem negativa da empresa</li>
                    <li>• Usuários repudiam a marca</li>
                    <li>• Manifestação de descontentamento</li>
                    <li>• Não atingem público potencial</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950/30">
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  <strong>⚠️ Importante:</strong> Como as mensagens SPAM são
                  enviadas para quaisquer endereços de e-mail, não conseguem
                  atingir um público potencial. Logo, esta prática não é
                  recomendável em nenhuma hipótese.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3. Nosso Compromisso */}
          <Card id="our-commitment">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Shield className="h-5 w-5 text-green-600" />
                3. Através desta Política Anti-Spam, Pretendemos:
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Manifestar-nos contrários à prática do SPAM, dentro e fora
                    de nossos servidores
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Colocar-nos à disposição dos órgãos competentes para
                    colaborar com a erradicação do SPAM
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Informar os usuários sobre as características e malefícios
                    da prática do SPAM
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Incentivar os usuários a apoiar a causa anti-spam e fazer
                    melhor uso da Internet
                  </span>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950/30">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-foreground text-sm">
                    Impedir que clientes façam uso da prática do SPAM em nossos
                    servidores
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Nossos E-mails */}
          <Card id="our-emails">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="h-5 w-5 text-blue-600" />
                4. Os E-mails Enviados pela {companyName}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <h4 className="mb-3 font-semibold text-blue-800 dark:text-blue-200">
                  ✅ Nossos E-mails SÃO:
                </h4>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-foreground text-sm">
                      Enviados apenas para usuários cadastrados
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-foreground text-sm">
                      Com remetente sempre identificado
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-foreground text-sm">
                      Com opção clara de descadastro (opt-out)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-foreground text-sm">
                      Com assunto claro e verdadeiro
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                <h4 className="mb-3 font-semibold text-red-800 dark:text-red-200">
                  ❌ Nossos E-mails NUNCA:
                </h4>
                <div className="grid gap-2">
                  <div className="flex items-center gap-3">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Usam cabeçalhos inválidos ou falsificados
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Usam nomes de domínio inválidos ou inexistentes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Empregam técnicas para adulterar informações de origem
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Usam meios para falsificar endereços
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    <span className="text-foreground text-sm">
                      Contêm informações falsas ou enganosas
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Como Cancelar */}
          <Card id="opt-out">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <UserCheck className="h-5 w-5 text-purple-600" />
                5. Como Cancelar o Recebimento de E-mails
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Respeitamos totalmente sua escolha de não receber nossas
                comunicações comerciais. Oferecemos múltiplas formas fáceis de
                cancelar:
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/30">
                  <h4 className="mb-3 font-semibold text-purple-800 dark:text-purple-200">
                    📧 Através do E-mail
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                    <li>• Link &ldquo;Descadastrar&rdquo; em cada e-mail</li>
                    <li>• Processo automático e instantâneo</li>
                    <li>• Confirmação de cancelamento</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-950/30">
                  <h4 className="mb-3 font-semibold text-purple-800 dark:text-purple-200">
                    🖥️ Através do Site
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                    <li>• Acesse sua conta no site</li>
                    <li>• Vá em &ldquo;Meu Perfil&rdquo;</li>
                    <li>• Desmarque &ldquo;Receber ofertas&rdquo;</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
                <h4 className="mb-2 font-semibold text-blue-800 dark:text-blue-200">
                  📞 Outros Canais
                </h4>
                <div className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <p>
                    <strong>E-mail:</strong> {companyEmail}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {envs.NEXT_PUBLIC_COMPANY_PHONE}
                  </p>
                  <p>
                    <strong>WhatsApp:</strong>{" "}
                    {envs.NEXT_PUBLIC_COMPANY_WHATSAPP}
                  </p>
                  <p>
                    <strong>Formulário:</strong> Canal &ldquo;Fale
                    Conosco&rdquo; no site
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 6. Como Denunciar */}
          <Card id="reporting">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Eye className="h-5 w-5 text-red-600" />
                6. Como Reclamar e Reportar SPAM
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                <h4 className="mb-2 font-semibold text-red-800 dark:text-red-200">
                  🚨 IMPORTANTE
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>NUNCA responda</strong> ou envie mensagens ao endereço
                  que lhe enviou SPAM, pois o spammer confirmará a veracidade de
                  seu endereço e continuará enviando mensagens indesejadas.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">
                    📧 Para Denunciar SPAM de Outros Servidores
                  </h4>
                  <p className="text-muted-foreground mb-2 text-sm">
                    Envie uma mensagem para os responsáveis pela rede de onde
                    partiu a mensagem, com cópia para:{" "}
                    <strong>mail-abuse@cert.br</strong>
                  </p>
                </div>

                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">📚 Recursos Úteis</h4>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>
                      • <strong>CERT.br</strong> - Centro de Estudos, Resposta e
                      Tratamento de Incidentes de Segurança no Brasil
                    </li>
                    <li>
                      • <strong>Cartilha de Segurança para Internet</strong> -
                      Guia completo sobre SPAM
                    </li>
                    <li>
                      • <strong>Orientações técnicas</strong> sobre que
                      informações enviar na denúncia
                    </li>
                  </ul>
                </div>

                <div className="border-primary/20 border-l-4 pl-4">
                  <h4 className="mb-2 font-semibold">
                    📞 Denunciar SPAM da {companyName}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Se acredita ter recebido SPAM de nossa empresa, entre em
                    contato imediatamente:
                    <strong> {companyEmail}</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. Padrões Técnicos */}
          <Card id="technical-standards">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Server className="h-5 w-5 text-gray-600" />
                7. Padrões Técnicos Adotados
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Seguimos rigorosamente as normas técnicas internacionais para
                comunicações eletrônicas:
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <h4 className="text-foreground mb-3 font-semibold">
                    ✅ Práticas Adotadas
                  </h4>
                  <ul className="text-foreground space-y-1 text-sm">
                    <li>• Autenticação SPF, DKIM e DMARC</li>
                    <li>• Cabeçalhos válidos e precisos</li>
                    <li>• Domínios verificados e válidos</li>
                    <li>• Infraestrutura própria certificada</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                  <h4 className="text-foreground mb-3 font-semibold">
                    🔒 Segurança
                  </h4>
                  <ul className="text-foreground space-y-1 text-sm">
                    <li>• Criptografia em trânsito (TLS)</li>
                    <li>• Monitoramento de reputação</li>
                    <li>• Lista de supressão automática</li>
                    <li>• Compliance com LGPD</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. Contato */}
          <Card id="contact">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MessageSquare className="text-primary h-5 w-5" />
                8. Dúvidas sobre Esta Política
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Para esclarecimentos sobre nossa Política Anti-Spam ou para
                reportar possíveis violações:
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold">📞 Canais de Contato</h4>
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
                      <strong>Telefone:</strong>{" "}
                      {envs.NEXT_PUBLIC_COMPANY_PHONE}
                    </p>
                    <p>
                      <strong>WhatsApp:</strong>{" "}
                      {envs.NEXT_PUBLIC_COMPANY_WHATSAPP}
                    </p>
                    <p>
                      <strong>Formulário:</strong> Canal &ldquo;Fale
                      Conosco&rdquo;
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">🕒 Atendimento</h4>
                  <div className="text-muted-foreground space-y-2 text-sm">
                    <p>Segunda a Sexta: 8h às 18h</p>
                    <p>Sábado: 8h às 12h</p>
                    <p>
                      <strong>Resposta em até 24 horas úteis</strong>
                    </p>
                    <p>Emergências: WhatsApp</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>💚 Compromisso:</strong> Trabalhamos continuamente
                  para manter a Internet um lugar melhor para comunicação e
                  informação. Sua colaboração é fundamental nessa missão.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer da Política */}
          <Card className="bg-slate-50 dark:bg-slate-800/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-2 text-sm">
                  <strong>Política Anti-Spam - {companyName}</strong>
                </p>
                <p className="text-muted-foreground text-xs">
                  Copyright © 2011-{new Date().getFullYear()} | Todos os
                  direitos reservados
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  Última atualização: {currentDate}
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  E-commerce B2B com comunicações éticas e responsáveis
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
