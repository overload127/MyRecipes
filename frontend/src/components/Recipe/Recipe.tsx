// @ts-nocheck
import { useState, useEffect } from 'react';
import { Layout, Col, Row, Image, Rate, Card, Steps } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined, LoadingOutlined } from '@ant-design/icons';
import { Radar, Column } from '@ant-design/plots';
import style from './Recipe.module.scss';

const { Content } = Layout;

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const selectIcon = ({ index }: { index: number }) => customIcons[index + 1];

const data = [
  {
    label: 'Шаг 1',
    averageTime: 10,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 2',
    averageTime: 7,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 3',
    averageTime: 45,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 4',
    averageTime: 3,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 5',
    averageTime: 56,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 6',
    averageTime: 10,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 7',
    averageTime: 3,
    description: 'Делаем шаг',
  },
  {
    label: 'Шаг 8',
    averageTime: 5,
    description: 'Делаем шаг',
  },
];

const configColumn = {
  data: data.map((item) => ({ label: item.label, averageTime: item.averageTime })),
  xField: 'label',
  yField: 'averageTime',
  columnStyle: {
    fill: 'green',
    fillOpacity: 0.5,
    stroke: 'black',
    lineWidth: 1,
    lineDash: [4, 5],
    strokeOpacity: 0.7,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    cursor: 'pointer',
  },
  meta: {
    label: {
      alias: 'Этап приготовления',
    },
    averageTime: {
      alias: 'Время (мин)',
    },
  },
  title: {
    visible: true,
    text: 'Your Stats',
  },
};

const dataRadar = [
  {
    name: 'Белки (г)',
    count: 100,
  },
  {
    name: 'Жиры (г)',
    count: 149,
  },
  {
    name: 'Углеводы (г)',
    count: 50,
  },
  {
    name: 'Калорийность',
    count: 36,
  },
];

const configRadar = {
  data: dataRadar.map((d) => ({ ...d })),
  xField: 'name',
  yField: 'count',
  appendPadding: [0, 10, 0, 10],
  meta: {
    count: {
      alias: 'Грамм',
      min: 0,
      nice: true,
      formatter: (v) => Number(v).toFixed(2),
    },
  },
  xAxis: {
    tickLine: null,
  },
  yAxis: {
    label: false,
    grid: {
      alternateColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  point: {
    size: 2,
  },
  area: {},
};

function Recipes(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const idTimer = setTimeout(() => {
      if (currentStep === data.length - 1) {
        setCurrentStep(0);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }, 2000);
    return () => {
      clearTimeout(idTimer);
    };
  }, [currentStep]);

  const dataSteps = data.map((item, index) => {
    let status = 'wait';
    let icon = null;
    if (index < currentStep) status = 'finish';
    else if (index === currentStep) {
      status = 'process';
      icon = <LoadingOutlined />;
    }
    return {
      title: item.label,
      subTitle: `Обычно ${item.averageTime} минут`,
      description: item.description,
      status,
      icon,
    };
  });

  return (
    <Content className={style.container}>
      <Row gutter={24}>
        <Col
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: '12px', paddingRight: '12px', marginBottom: '20px' }}
        >
          <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>
            <Image
              rootClassName={style.firstCell}
              src="https://www.ixbt.com/img/n1/news/2021/9/5/d5d11c91b095686fcaa0f14cf8bbb7fa-600x450_large.jpg"
            />
            <p className={style.description}>
              Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum
              используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное
              распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст..
              Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют
              Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу
              показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст
              Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например,
              юмористические варианты). Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает
              сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное
              заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при
              простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной
              вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым
              словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего
              рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке,
              некоторые - намеренно (например, юмористические варианты).
            </p>
          </Card>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col
          xl={12}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: '12px', paddingRight: '12px', marginBottom: '20px' }}
        >
          <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>
            <Steps direction="vertical" size="small" items={dataSteps} />
          </Card>
        </Col>
        <Col
          xl={12}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: '12px', paddingRight: '12px', marginBottom: '20px' }}
        >
          <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>
            <div className={style.chartTitle}>Время готовки (шаги/минуты)</div>
            <Column {...configColumn} />
          </Card>
        </Col>
        <Col
          xl={12}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: '12px', paddingRight: '12px', marginBottom: '20px' }}
        >
          <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>
            <div className={style.chartTitle}>Распределение компонентов</div>
            <Radar {...configRadar} />
          </Card>
        </Col>
        <Col
          xl={12}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{ paddingLeft: '12px', paddingRight: '12px', marginBottom: '20px' }}
        >
          <Card
            bodyStyle={{
              padding: '20px 24px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div className={style.row}>
              <div>Общий рейтинг</div>
              <Rate value={4} character={selectIcon} disabled />
            </div>
            <div className={style.row}>
              <div>Ваша отметка</div>
              <Rate value={0} character={selectIcon} />
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
}

export default Recipes;
