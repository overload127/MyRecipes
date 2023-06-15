import { Card, Rate } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import style from './CustomCarousel.module.scss';

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const selectIcon = ({ index }: { index: number }) => customIcons[index + 1];

interface IProps {
  reverseDirection?: boolean;
}

function CustomCarousel({ reverseDirection }: IProps) {
  const objectData = [
    {
      id: 1,
      author_name: 'admin',
      name: 'ultra top 1',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 2,
      author_name: 'admin',
      name: 'ultra top 2',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 3,
      author_name: 'admin',
      name: 'ultra top 3',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 4,
      author_name: 'admin',
      name: 'ultra top 4',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 5,
      author_name: 'admin',
      name: 'ultra top 5',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 6,
      author_name: 'admin',
      name: 'ultra top 6',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 7,
      author_name: 'admin',
      name: 'ultra top 7',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
    {
      id: 8,
      author_name: 'admin',
      name: 'ultra top 8',
      description: 'dddddddddddd',
      ingredients: ['dsfsdf', 'sdfdsf'],
      rating: 4,
    },
  ];
  return (
    <Swiper
      spaceBetween={30}
      loop
      speed={10000}
      autoplay={{
        delay: 0,
        reverseDirection,
      }}
      modules={[Autoplay]}
      className="mySwiper"
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        900: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1400: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      }}
    >
      {objectData.map((recipe) => (
        <SwiperSlide>
          <a href={`/recipe/${recipe.id}`} key={recipe.id} className={style.wrapCard}>
            <Card
              hoverable
              className={style.card}
              bodyStyle={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
              cover={
                <img
                  alt="example"
                  src="https://www.ixbt.com/img/n1/news/2021/9/5/d5d11c91b095686fcaa0f14cf8bbb7fa-600x450_large.jpg"
                />
              }
              size="small"
            >
              <div className={style.footer}>
                <br className={style.line} />
                <div className={style.content}>
                  <div className={style.rating}>
                    {/* @ts-ignore */}
                    <Rate value={recipe.rating} character={selectIcon} disabled />
                  </div>
                  <div className={style.author}>Автор: {recipe.author_name}</div>
                </div>
              </div>
            </Card>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

CustomCarousel.defaultProps = {
  reverseDirection: false,
};

export default CustomCarousel;
