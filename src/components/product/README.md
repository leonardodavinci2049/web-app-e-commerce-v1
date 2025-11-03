# Product Detail Page Components

Componentes criados para a página de detalhes do produto no projeto.

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   └── product/
│       ├── [...slug]/
│       │   └── page.tsx          # Página principal de detalhes
│       └── not-found.tsx          # Página 404 customizada
└── components/
    └── product/
        ├── product-image-gallery.tsx    # Galeria de imagens (Client)
        ├── product-info.tsx             # Informações do produto (Server)
        ├── product-actions.tsx          # Ações do produto (Client)
        ├── product-tabs.tsx             # Abas de informações (Client)
        ├── breadcrumb-nav.tsx           # Navegação breadcrumb (Server)
        └── related-products.tsx         # Produtos relacionados (Server)
```

## 🎯 Componentes

### 1. ProductImageGallery (Client Component)
**Arquivo:** `product-image-gallery.tsx`

Componente que exibe a imagem principal do produto com badges e efeito de zoom no hover.

**Props:**
- `mainImage`: URL da imagem principal
- `productName`: Nome do produto (para alt text)
- `isNew`: Flag se é produto novo
- `discount`: Porcentagem de desconto
- `badge`: Badge customizado

**Características:**
- Fallback para imagem não encontrada
- Badges de desconto, novo e customizado
- Efeito hover zoom
- Imagem responsiva

### 2. ProductInfo (Server Component)
**Arquivo:** `product-info.tsx`

Exibe informações básicas do produto: título, categoria, preço, avaliação.

**Props:**
- `product`: Objeto Product completo

**Características:**
- Badge de categoria
- Sistema de avaliação (5 estrelas)
- Indicador de estoque
- Cálculo de economia em desconto
- Parcelamento automático (12x)

### 3. ProductActions (Client Component)
**Arquivo:** `product-actions.tsx`

Componente interativo para ações do usuário: adicionar ao carrinho, WhatsApp, favoritos.

**Props:**
- `productName`: Nome do produto
- `productPrice`: Preço do produto

**Características:**
- Seletor de quantidade (+/-)
- Botão "Adicionar ao Carrinho" com toast
- Botão WhatsApp com mensagem pré-formatada
- Botão de favoritos com toggle
- Informações de garantia e frete
- Validação de quantidade (1-99)

### 4. ProductTabs (Client Component)
**Arquivo:** `product-tabs.tsx`

Sistema de abas para exibir descrição, especificações e informações de entrega.

**Props:**
- `brand`: Marca do produto
- `category`: Categoria do produto

**Características:**
- 3 abas: Descrição, Especificações, Entrega
- Conteúdo mockado com informações realistas
- Navegação por abas com indicador visual
- Responsivo

**Abas:**
1. **Descrição**: Texto descritivo com características e aplicações
2. **Especificações**: Tabela com dados técnicos
3. **Entrega**: Informações sobre frete, prazo e rastreamento

### 5. BreadcrumbNav (Server Component)
**Arquivo:** `breadcrumb-nav.tsx`

Navegação hierárquica (breadcrumb) para melhorar UX.

**Props:**
- `category`: Categoria do produto
- `productName`: Nome do produto

**Características:**
- Links funcionais para Home e Produtos
- Truncamento de texto longo
- Ícone de home
- Separadores visuais

### 6. RelatedProducts (Server Component)
**Arquivo:** `related-products.tsx`

Exibe produtos relacionados da mesma categoria.

**Props:**
- `products`: Array de produtos relacionados
- `currentProductId`: ID do produto atual (para filtrar)

**Características:**
- Limita a 4 produtos
- Filtra produto atual
- Grid responsivo
- Usa componente ProductCard

## 🌐 Página Principal

### page.tsx (Dynamic Route)
**Arquivo:** `app/product/[...slug]/page.tsx`

Página dinâmica que recebe múltiplos segmentos de URL.

**Formato da URL:**
```
/product/[category]/[id]/[name-slug]
```

**Exemplo:**
```
/product/ferramentas-eletricas/prod-001/furadeira-de-impacto-profissional-850w
```

**Características:**
- Busca produto por ID nos dados mockados
- Redirecionamento para 404 se não encontrado
- Generate Static Params para SSG
- Metadata dinâmica para SEO
- Layout responsivo (grid 2 colunas desktop)
- Sticky sidebar com imagem

## 🎨 Design e UX

### Layout Responsivo
- **Mobile**: Layout em coluna única
- **Desktop**: Grid 2 colunas (imagem + info)
- **Imagem sticky**: Permanece visível durante scroll (desktop)

### Interações do Usuário
1. **Adicionar ao Carrinho**: Toast de confirmação
2. **WhatsApp**: Abre em nova aba com mensagem pré-formatada
3. **Favoritos**: Toggle com feedback visual
4. **Quantidade**: Botões +/- com limites (1-99)
5. **Abas**: Navegação suave entre seções

### Componentes Client vs Server
- **Client Components**: Componentes com interatividade (useState, onClick)
- **Server Components**: Componentes estáticos de layout e informação

## 📱 Integração WhatsApp

O botão WhatsApp gera automaticamente uma mensagem formatada:

```
Olá! Tenho interesse no produto: [Nome do Produto]
Preço: R$ [Preço]
Quantidade: [Quantidade]
```

**Número configurado:** +55 11 99999-9999 (mock)

## 🔗 Navegação

### De ProductCard para Detalhes
Atualizado em `product-card.tsx`:
```typescript
const productUrl = `/product/${category}/${id}/${name-slug}`;
```

### Breadcrumb
```
Home > Produtos > [Categoria] > [Nome do Produto]
```

## 📊 Dados Mockados

Os produtos são importados de `@/lib/mock-data.ts`:
- `allProducts`: Array com todos os produtos disponíveis
- Cada produto contém: id, name, price, image, category, etc.

## 🎯 Próximos Passos (Sugestões)

1. **Galeria Múltipla**: Adicionar thumbnails e carrossel
2. **Zoom de Imagem**: Implementar zoom modal ou lupa
3. **Avaliações Reais**: Sistema de reviews e ratings
4. **Compartilhamento**: Botões de redes sociais
5. **Wishlist Persistente**: Salvar favoritos no localStorage/DB
6. **Carrinho Real**: Integrar com sistema de carrinho
7. **Variações**: Cor, tamanho, voltagem, etc.
8. **Estoque Real**: Integrar com API de estoque
9. **Histórico de Preço**: Gráfico de variação de preço
10. **Perguntas e Respostas**: Seção de Q&A

## 🛠️ Tecnologias Utilizadas

- **Next.js 15**: App Router, Server/Client Components
- **TypeScript**: Tipagem forte
- **Tailwind CSS v4**: Estilização
- **Shadcn/UI**: Componentes base (Button, Badge, etc.)
- **Lucide React**: Ícones
- **Sonner**: Toast notifications
- **Next Image**: Otimização de imagens

## 📝 Notas Importantes

- ✅ Todos os componentes seguem as convenções do projeto
- ✅ Comentários em inglês no código
- ✅ Mensagens de UI em português (via i18n no futuro)
- ✅ Componentes server-side por padrão
- ✅ Client components apenas quando necessário
- ✅ Dados mockados para prova de conceito
- ✅ SEO otimizado com metadata dinâmica
- ✅ Responsivo mobile-first
