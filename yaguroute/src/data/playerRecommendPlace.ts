import food1 from '../images/dummy/food1.jpg'
import food2 from '../images/dummy/food2.jpg'
import food3 from '../images/dummy/food3.jpg'

export interface Place {
    id: number
    title: string
    category: string
    description: string
    image: string 
    badge?: string
}
  
export const dummyPlaces: Place[] = [
    {
      id: 1,
      title: '만수 냉면',
      category: '맛집',
      description: '경기장에서 12km | 부사동',
      image: food1.src,
      badge: '#류현진 PICK',
    },
    {
      id: 2,
      title: '구이구이쪽갈비',
      category: '맛집',
      description: '대전 중구 안창로 9-32',
      image: food2.src,
      badge: '#류현진 PICK',
    },
    {
      id: 3,
      title: '또보겠지 떡볶이',
      category: '맛집',
      description: '경기장에서 8km | 둔산동',
      image: food3.src,
      badge: '#류현진 PICK',
    },
  ]
  