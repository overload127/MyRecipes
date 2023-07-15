import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Rate, Pagination } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { changePerPage, loadRecipesByPage } from 'store/reducers/recipes/ActionCreators';
import style from './RecipeList.module.scss';

const { Meta } = Card;

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

function RecipeList(): JSX.Element {
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { isFailed, error, objectData: recipes, isFetching } = useAppSelector((state) => state.recipesReducer.recipes);
  const { currentPage, perPage, total } = useAppSelector((state) => state.recipesReducer.parameters);

  useEffect(() => {
    dispatch(loadRecipesByPage(currentPage, false, perPage));
  }, [currentPage, perPage, dispatch]);

  useEffect(() => {
    if (!isFetching) scrollToRef.current?.scrollIntoView(true);
  }, [isFetching]);

  if (isFailed) return <p>{error}</p>;

  return (
    <div className={style.wrapper}>
      <div className={style.container} ref={scrollToRef}>
        {recipes.map((recipe) => (
          <NavLink to={`/recipe/${recipe.id}`} key={recipe.id}>
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
              <Meta title={recipe.name} description={recipe.description} />
              <div className={style.footer}>
                <br className={style.line} />
                <div className={style.content}>
                  <div className={style.rating}>
                    <Rate
                      allowHalf
                      value={recipe.meanRating}
                      character={({ index }) => customIcons[index! + 1]}
                      disabled
                    />
                  </div>
                  <div className={style.author}>Автор: {recipe.authorName}</div>
                </div>
              </div>
            </Card>
          </NavLink>
        ))}
      </div>
      <div className={style.pagination}>
        <Pagination
          current={currentPage + 1}
          total={total}
          pageSize={perPage}
          onChange={(page, size) => {
            dispatch(changePerPage(page, size));
          }}
        />
      </div>
    </div>
  );
}

export default RecipeList;
