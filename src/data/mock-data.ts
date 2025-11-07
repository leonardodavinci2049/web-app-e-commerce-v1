/**
 * Mock Data for Homepage
 * Fictional data for products, categories, banners, etc.
 */

import type {
  Advantage,
  Banner,
  Category,
  NavigationItem,
  Product,
  Testimonial,
} from "@/types/home";

// Categories for navigation and department section
export const categories: Category[] = [
  {
    id: "ferramentas-eletricas",
    name: "Assistência Técnica",
    icon: "drill",
    href: "#ferramentas-eletricas",
    description: "Ferramentas elétricas para todos os tipos de reparos e construções.",
  },

];

// Navigation menu items
export const navigationItems: NavigationItem[] = [
  {
    id: "departamentos",
    label: "DEPARTAMENTOS",
    href: "#departamentos",
    hasDropdown: true,
    dropdownItems: categories,
  },

  {
    id: "catalogo",
    label: "CATALOGO",
    href: "/products",
  },
  {
    id: "tabela",
    label: "TABELA",
    href: "/tabela",
  },
  {
    id: "pecas-e-componentes",
    label: "PEÇAS E COMPONENTES",
    href: "/products",
  },
  {
    id: "flontal",
    label: "FLONTAL",
    href: "/products",
  },
  {
    id: "capas-e-peliculas",
    label: "CAPAS E PELÍCULAS",
    href: "/products",
  },

  {
    id: "baterias-e-carregadores  ",
    label: "BATERIAS E CARREGADORES",
    href: "/products",
  },
  {
    id: "suprimentos",
    label: "SUPRIMENTOS",
    href: "/products",
  },

  
];

// Products mock data
export const featuredProducts: Product[] = [
  {
    id: "prod-001",
    name: "Furadeira de Impacto Profissional 850W",
    price: 349.9,
    originalPrice: 499.9,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    isNew: true,
    discount: 30,
    category: "Ferramentas Elétricas",
    badge: "Mais Vendido",
  },
  {
    id: "prod-002",
    name: "Parafusadeira/Furadeira 12V com 2 Baterias",
    price: 289.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    category: "Ferramentas Elétricas",
    isNew: true,
  },
  {
    id: "prod-003",
    name: 'Esmerilhadeira Angular 4.1/2" 850W',
    price: 199.9,
    originalPrice: 279.9,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400",
    discount: 29,
    category: "Ferramentas Elétricas",
  },
  {
    id: "prod-004",
    name: 'Serra Circular 7.1/4" 1600W',
    price: 459.9,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
    category: "Ferramentas Elétricas",
    badge: "Lançamento",
  },
  {
    id: "prod-005",
    name: "Kit Ferramentas Manuais 129 Peças",
    price: 599.9,
    originalPrice: 899.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    discount: 33,
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-006",
    name: "Jogo de Chaves Combinadas 8 a 19mm",
    price: 129.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-007",
    name: "Capacete de Segurança com Carneira",
    price: 45.9,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    category: "Equipamentos de Segurança",
    isNew: true,
  },
  {
    id: "prod-008",
    name: "Luva de Proteção Mecânica - Par",
    price: 19.9,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400",
    category: "Equipamentos de Segurança",
  },
];

export const newProducts: Product[] = [
  {
    id: "prod-009",
    name: "Lixadeira Orbital 180W",
    price: 179.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    isNew: true,
    category: "Ferramentas Elétricas",
  },
  {
    id: "prod-010",
    name: "Compressor de Ar 8,2 Pés 24L",
    price: 689.9,
    originalPrice: 899.9,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
    discount: 23,
    category: "Equipamentos Industriais",
  },
  {
    id: "prod-011",
    name: "Martelete Perfurador Rompedor 800W",
    price: 549.9,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    isNew: true,
    category: "Ferramentas Elétricas",
    badge: "Novidade",
  },
  {
    id: "prod-012",
    name: "Jogo de Brocas para Madeira e Metal 13 Peças",
    price: 59.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-013",
    name: "Pistola de Pintura Elétrica 450W",
    price: 299.9,
    originalPrice: 399.9,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    discount: 25,
    category: "Tintas e Vernizes",
  },
  {
    id: "prod-014",
    name: "Soprador Térmico 2000W",
    price: 159.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    category: "Ferramentas Elétricas",
  },
  {
    id: "prod-015",
    name: "Kit de Segurança Completo 5 Peças",
    price: 149.9,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    isNew: true,
    category: "Equipamentos de Segurança",
  },
  {
    id: "prod-016",
    name: "Trena Profissional 8m com Trava",
    price: 34.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Ferramentas Manuais",
  },
];

export const benchProducts: Product[] = [
  {
    id: "prod-017",
    name: "Furadeira de Bancada 350W",
    price: 589.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    category: "Equipamentos Industriais",
    badge: "Profissional",
  },
  {
    id: "prod-018",
    name: 'Serra de Bancada 1500W 10"',
    price: 1299.9,
    originalPrice: 1699.9,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400",
    discount: 24,
    category: "Equipamentos Industriais",
  },
  {
    id: "prod-019",
    name: 'Esmeril de Bancada 360W 6"',
    price: 349.9,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
    category: "Equipamentos Industriais",
  },
  {
    id: "prod-020",
    name: 'Morsa de Bancada 4" Base Giratória',
    price: 159.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-021",
    name: "Lixadeira de Bancada Combinada",
    price: 899.9,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    category: "Equipamentos Industriais",
    isNew: true,
  },
  {
    id: "prod-022",
    name: "Tupia de Bancada 1200W",
    price: 749.9,
    originalPrice: 999.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    discount: 25,
    category: "Equipamentos Industriais",
  },
  {
    id: "prod-023",
    name: "Serra Tico-Tico de Bancada 120W",
    price: 449.9,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400",
    category: "Equipamentos Industriais",
  },
  {
    id: "prod-024",
    name: "Politriz de Bancada 750W",
    price: 629.9,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
    category: "Equipamentos Industriais",
  },
];

// Additional products for the products page
export const additionalProducts: Product[] = [
  // Materiais Elétricos
  {
    id: "prod-025",
    name: "Fio Elétrico Flexível 2,5mm 100m",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    category: "Materiais Elétricos",
  },
  {
    id: "prod-026",
    name: "Disjuntor Bipolar 25A",
    price: 34.9,
    originalPrice: 49.9,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400",
    discount: 30,
    category: "Materiais Elétricos",
  },
  {
    id: "prod-027",
    name: "Tomada 2P+T 10A com Placa",
    price: 12.9,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    category: "Materiais Elétricos",
  },
  {
    id: "prod-028",
    name: "Interruptor Simples com Placa",
    price: 8.9,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400",
    category: "Materiais Elétricos",
  },

  // Hidráulica
  {
    id: "prod-029",
    name: "Tubo PVC 100mm 6m",
    price: 45.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Hidráulica",
  },
  {
    id: "prod-030",
    name: "Joelho PVC 90° 100mm",
    price: 8.5,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Hidráulica",
  },
  {
    id: "prod-031",
    name: "Registro de Gaveta 3/4",
    price: 28.9,
    originalPrice: 39.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    discount: 28,
    category: "Hidráulica",
  },
  {
    id: "prod-032",
    name: "Válvula de Descarga 1.1/2",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Hidráulica",
  },

  // Parafusos e Fixadores
  {
    id: "prod-033",
    name: "Parafuso Cabeça Phillips 4x40mm 100un",
    price: 15.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Parafusos e Fixadores",
  },
  {
    id: "prod-034",
    name: "Bucha Nylon S8 100 Peças",
    price: 18.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Parafusos e Fixadores",
  },
  {
    id: "prod-035",
    name: "Prego 18x27 1kg",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Parafusos e Fixadores",
  },
  {
    id: "prod-036",
    name: "Arruela Lisa M8 50 Peças",
    price: 9.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Parafusos e Fixadores",
  },

  // Tintas e Vernizes
  {
    id: "prod-037",
    name: "Tinta Acrílica Branca 3,6L",
    price: 79.9,
    originalPrice: 99.9,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    discount: 20,
    category: "Tintas e Vernizes",
  },
  {
    id: "prod-038",
    name: "Pincel Chato N°4",
    price: 8.9,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    category: "Tintas e Vernizes",
  },
  {
    id: "prod-039",
    name: "Rolo de Espuma 23cm",
    price: 14.9,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    category: "Tintas e Vernizes",
  },
  {
    id: "prod-040",
    name: "Verniz Marítimo 900ml",
    price: 45.9,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    category: "Tintas e Vernizes",
    isNew: true,
  },

  // Mais Ferramentas Elétricas
  {
    id: "prod-041",
    name: "Parafusadeira de Impacto 18V",
    price: 459.9,
    originalPrice: 599.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    discount: 23,
    category: "Ferramentas Elétricas",
    badge: "Oferta",
  },
  {
    id: "prod-042",
    name: "Micro Retífica 135W",
    price: 189.9,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    category: "Ferramentas Elétricas",
  },
  {
    id: "prod-043",
    name: "Plaina Elétrica 900W",
    price: 329.9,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400",
    category: "Ferramentas Elétricas",
  },
  {
    id: "prod-044",
    name: "Furadeira Magnética 1200W",
    price: 1899.9,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    category: "Ferramentas Elétricas",
    badge: "Profissional",
  },

  // Mais Ferramentas Manuais
  {
    id: "prod-045",
    name: "Alicate Universal 8",
    price: 45.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-046",
    name: "Martelo Unha 25mm",
    price: 29.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-047",
    name: "Lima Bastarda 10",
    price: 19.9,
    image: "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=400",
    category: "Ferramentas Manuais",
  },
  {
    id: "prod-048",
    name: "Esquadro Profissional 300mm",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    category: "Ferramentas Manuais",
  },
];

// All products combined for the products page
export const allProducts: Product[] = [
  ...featuredProducts,
  ...newProducts,
  ...benchProducts,
  ...additionalProducts,
];

// Promotional banners
export const promoBanners: Banner[] = [
  {
    id: "banner-001",
    title: "Oferta Relâmpago",
    subtitle: "Até 50% OFF",
    ctaText: "Aproveite",
    ctaLink: "#ofertas",
    type: "primary",
  },
  {
    id: "banner-002",
    title: "Frete Grátis",
    subtitle: "Acima de R$299",
    ctaText: "Saiba Mais",
    ctaLink: "#frete",
    type: "secondary",
  },
  {
    id: "banner-003",
    title: "Parcelamento",
    subtitle: "12x sem juros",
    ctaText: "Confira",
    ctaLink: "#parcelamento",
    type: "accent",
  },
  {
    id: "banner-004",
    title: "Retire na Loja",
    subtitle: "Rápido e seguro",
    ctaText: "Localização",
    ctaLink: "#loja",
    type: "muted",
  },
];

// Customer segments
export const customerSegments: Testimonial[] = [
  {
    id: "seg-001",
    title: "Pessoa Física",
    description:
      "Ferramentas e equipamentos para uso doméstico e pequenos reparos. Qualidade profissional para o dia a dia.",
    icon: "user",
    ctaText: "Ver Produtos",
    ctaLink: "#pessoa-fisica",
  },
  {
    id: "seg-002",
    title: "Pequenas Empresas",
    description:
      "Equipamentos profissionais para pequenos negócios e prestadores de serviço. Preços especiais para atacado.",
    icon: "briefcase",
    ctaText: "Solicitar Orçamento",
    ctaLink: "#pequenas-empresas",
  },
  {
    id: "seg-003",
    title: "Grandes Empresas",
    description:
      "Soluções industriais completas para grandes operações. Atendimento personalizado e condições diferenciadas.",
    icon: "building",
    ctaText: "Falar com Consultor",
    ctaLink: "#grandes-empresas",
  },
];

// Company advantages
export const advantages: Advantage[] = [
  {
    id: "adv-001",
    title: "Entrega Rápida",
    description: "Receba seus produtos em até 48h",
    icon: "truck",
  },
  {
    id: "adv-002",
    title: "Melhor Preço",
    description: "Preços competitivos no atacado",
    icon: "tag",
  },
  {
    id: "adv-003",
    title: "Atendimento Especializado",
    description: "Equipe técnica pronta para ajudar",
    icon: "headphones",
  },
  {
    id: "adv-004",
    title: "Produtos de Qualidade",
    description: "Marcas reconhecidas no mercado",
    icon: "star",
  },
];
