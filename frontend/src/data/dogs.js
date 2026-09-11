import heroImage from '../assets/dogs-hero.png'

// Mock visual da primeira etapa. Sera substituido pela listagem da API futuramente.
export const dogs = [
  { nome: 'Caramelo', especie: 'Cachorro', idade: 3, raca: 'SRD', porte: 'Médio', imagePosition: '56% center' },
  { nome: 'Luna', especie: 'Cachorro', idade: 2, raca: 'Labrador', porte: 'Grande', imagePosition: '30% center' },
  { nome: 'Bob', especie: 'Cachorro', idade: 5, raca: 'Beagle', porte: 'Médio', imagePosition: '88% center' },
].map((dog) => ({ ...dog, image: heroImage }))
