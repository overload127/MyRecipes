import { NavLink } from 'react-router-dom';
import { Breadcrumb, Card, Rate, Pagination } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useAppSelector } from 'hooks/redux';
import { changePage } from 'store/reducers/recipe/ActionCreators';
import style from './Recipes.module.scss';

const { Meta } = Card;

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const selectIcon = ({ index }: { index: number }) => customIcons[index + 1];

function Recipes(): JSX.Element {
  const { isFailed, error, objectData, isFetching } = useAppSelector((state) => state.recipeReducer.data);
  const { currentPage, total } = useAppSelector((state) => state.recipeReducer.parameters);

  if (isFailed) return <p>{error}</p>;

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Рецепты</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div className={style.wrapper}>
          <div className={style.container}>
            {objectData.map((recipe) => (
              <NavLink to={`/recipe/${recipe.id}`} key={recipe.id}>
                <Card
                  // onClick={() => alert('Hello from here')}
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
                  <Meta title={recipe.name} description={recipe.description} />
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
              </NavLink>
            ))}
          </div>
          <Pagination
            showQuickJumper
            showSizeChanger
            defaultCurrent={currentPage}
            total={total}
            onChange={changePage}
            disabled={isFetching}
          />
        </div>
      </div>
    </>
  );
}

export default Recipes;
